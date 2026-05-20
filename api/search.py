"""
PriceReviewer — Vercel Serverless: /api/search
Proxies search requests to SerpAPI Google Shopping.
"""

import os
import time
import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import urllib.request
import urllib.error

# Configuration
SERPAPI_KEY = os.environ.get('SERPAPI_KEY', '')
SERPAPI_URL = 'https://serpapi.com/search'

# In-memory cache (per cold start, limited but helpful)
_cache = {}
CACHE_TTL = 900
MAX_CACHE = 100


def _cache_get(key):
    entry = _cache.get(key)
    if entry and (time.time() - entry['ts']) < CACHE_TTL:
        return entry['data']
    if entry:
        del _cache[key]
    return None


def _cache_set(key, data):
    if len(_cache) >= MAX_CACHE:
        oldest = min(_cache, key=lambda k: _cache[k]['ts'])
        del _cache[oldest]
    _cache[key] = {'data': data, 'ts': time.time()}


def _call_serpapi(params):
    """Call SerpAPI and return (shopping_results, error_msg)."""
    try:
        query_string = '&'.join(f'{k}={urllib.parse.quote(str(v))}' for k, v in params.items())
        url = f'{SERPAPI_URL}?{query_string}'
        req = urllib.request.Request(url, headers={'User-Agent': 'PriceReviewer/1.0'})
        with urllib.request.urlopen(req, timeout=20) as resp:
            raw = json.loads(resp.read().decode('utf-8'))
            if 'error' in raw:
                return [], raw['error']
            return raw.get('shopping_results', []), ''
    except urllib.error.URLError as exc:
        return [], str(exc)
    except Exception as exc:
        return [], str(exc)


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)

        query = qs.get('q', [''])[0].strip()
        country = qs.get('country', ['us'])[0].strip().lower()
        page = 1
        try:
            page = max(1, int(qs.get('page', ['1'])[0]))
        except ValueError:
            page = 1

        # No query
        if not query:
            self._json_response(400, {
                'error': 'Falta el parámetro de búsqueda',
                'results': [],
                'api_available': bool(SERPAPI_KEY),
            })
            return

        # No API key
        if not SERPAPI_KEY:
            self._json_response(200, {
                'results': [],
                'api_available': False,
                'message': 'SERPAPI_KEY no configurada.',
            })
            return

        # Check cache
        cache_key = f'search:{query.lower()}:{country}:{page}'
        cached = _cache_get(cache_key)
        if cached:
            cached['from_cache'] = True
            self._json_response(200, cached)
            return

        # Build params
        params = {
            'engine': 'google_shopping',
            'q': query,
            'api_key': SERPAPI_KEY,
            'hl': 'es',
            'gl': country,
            'num': '20',
        }
        if country == 'pe':
            params['location'] = 'Peru'
        if page > 1:
            params['start'] = str((page - 1) * 20)

        # Search with fallback
        shopping_results, api_error = _call_serpapi(params)
        is_fallback = False

        if not shopping_results and not api_error and country != 'us':
            params_broad = params.copy()
            params_broad['gl'] = 'us'
            params_broad.pop('location', None)
            shopping_results, api_error = _call_serpapi(params_broad)
            if shopping_results:
                is_fallback = True

        if not shopping_results and api_error and country != 'us':
            params_broad = params.copy()
            params_broad['gl'] = 'us'
            params_broad.pop('location', None)
            results_us, _ = _call_serpapi(params_broad)
            if results_us:
                shopping_results = results_us
                is_fallback = True
                api_error = ''

        # Transform results
        results = []
        for item in shopping_results:
            price = item.get('extracted_price')
            title = item.get('title', '')
            if not price or not title:
                continue

            old_price_val = 0
            old_price_raw = ''
            old_price_obj = item.get('old_price')
            if isinstance(old_price_obj, dict):
                old_price_val = old_price_obj.get('extracted', 0) or 0
                old_price_raw = old_price_obj.get('raw', '')
            elif isinstance(old_price_obj, (int, float)):
                old_price_val = old_price_obj

            results.append({
                'title': title,
                'price': price,
                'price_raw': item.get('price', ''),
                'source': item.get('source', 'Tienda'),
                'link': item.get('link', '#'),
                'thumbnail': item.get('thumbnail', ''),
                'rating': item.get('rating') or 0,
                'reviews': item.get('reviews') or 0,
                'delivery': item.get('delivery', ''),
                'product_id': item.get('product_id', ''),
                'old_price': old_price_val,
                'old_price_raw': old_price_raw,
                'extensions': item.get('extensions', []),
            })

        payload = {
            'results': results,
            'total': len(results),
            'query': query,
            'page': page,
            'api_available': True,
            'from_cache': False,
            'is_fallback': is_fallback,
            'api_error': api_error,
        }

        if not api_error:
            _cache_set(cache_key, payload)

        self._json_response(200, payload)

    def _json_response(self, status, data):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
