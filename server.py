"""
PriceReviewer — Backend API Proxy
Serves static files and proxies requests to SerpAPI Google Shopping
for real-time product price comparison.

Usage:
  1. Set your API key:  set SERPAPI_KEY=your_key_here
  2. Run:               python server.py
  3. Open:              http://localhost:5000
"""

import os
import time
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests as http_requests

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)

# Auto-load .env file if it exists (no extra dependency needed)
_env_path = os.path.join(BASE_DIR, '.env')
if os.path.isfile(_env_path):
    with open(_env_path, 'r', encoding='utf-8') as _f:
        for _line in _f:
            _line = _line.strip()
            if _line and not _line.startswith('#') and '=' in _line:
                _key, _val = _line.split('=', 1)
                os.environ.setdefault(_key.strip(), _val.strip())

# Configuration
SERPAPI_KEY = os.environ.get('SERPAPI_KEY', '')
CACHE_TTL = 900          # 15 minutes
MAX_CACHE_SIZE = 200      # Max cached queries
SERPAPI_URL = 'https://serpapi.com/search'

# In-memory cache  { key: { data: ..., ts: ... } }
_cache = {}


# ---------------------------------------------------------------------------
# Cache helpers
# ---------------------------------------------------------------------------
def _cache_get(key):
    """Return cached data if still valid, else None."""
    entry = _cache.get(key)
    if entry and (time.time() - entry['ts']) < CACHE_TTL:
        return entry['data']
    if entry:
        del _cache[key]
    return None


def _cache_set(key, data):
    """Store data in cache. Evict oldest if full."""
    if len(_cache) >= MAX_CACHE_SIZE:
        oldest = min(_cache, key=lambda k: _cache[k]['ts'])
        del _cache[oldest]
    _cache[key] = {'data': data, 'ts': time.time()}


# ---------------------------------------------------------------------------
# Static file serving
# ---------------------------------------------------------------------------
@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/<path:filepath>')
def serve_static(filepath):
    return send_from_directory(BASE_DIR, filepath)


# ---------------------------------------------------------------------------
# API: Search products via Google Shopping
# ---------------------------------------------------------------------------
@app.route('/api/search')
def api_search():
    query = request.args.get('q', '').strip()
    country = request.args.get('country', 'us').strip().lower()
    page = request.args.get('page', '1')
    try:
        page = max(1, int(page))
    except ValueError:
        page = 1

    if not query:
        return jsonify({
            'error': 'Falta el parámetro de búsqueda',
            'results': [],
            'api_available': bool(SERPAPI_KEY),
        }), 400

    # If no API key, signal frontend to use demo data
    if not SERPAPI_KEY:
        return jsonify({
            'results': [],
            'api_available': False,
            'message': 'SERPAPI_KEY no configurada. Usa datos demo.',
        })

    # Check cache
    cache_key = f'search:{query.lower()}:{country}:{page}'
    cached = _cache_get(cache_key)
    if cached:
        cached['from_cache'] = True
        return jsonify(cached)

    # Call SerpAPI
    params = {
        'engine': 'google_shopping',
        'q': query,
        'api_key': SERPAPI_KEY,
        'hl': 'es',
        'gl': country,
        'location': 'Peru' if country == 'pe' else None,
        'num': 20,
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    if page > 1:
        params['start'] = (page - 1) * 20

    shopping_results = []
    is_fallback = False
    api_error = ''

    def _call_serpapi(p):
        """Call SerpAPI and return (shopping_results, error_msg)."""
        try:
            resp = http_requests.get(SERPAPI_URL, params=p, timeout=20)
            raw = resp.json()

            # SerpAPI sometimes returns 200 with an error field
            if 'error' in raw:
                return [], raw['error']

            return raw.get('shopping_results', []), ''
        except http_requests.exceptions.Timeout:
            return [], 'Tiempo de espera agotado'
        except http_requests.exceptions.RequestException as exc:
            return [], str(exc)
        except Exception as exc:
            return [], str(exc)

    # 1st attempt: search with user's country
    shopping_results, api_error = _call_serpapi(params)

    # 2nd attempt: if no results for local country, try US/global
    if not shopping_results and not api_error and country != 'us':
        params_broad = params.copy()
        params_broad['gl'] = 'us'
        shopping_results, api_error = _call_serpapi(params_broad)
        if shopping_results:
            is_fallback = True

    # 3rd attempt: if country search errored, try US as last resort
    if not shopping_results and api_error and country != 'us':
        params_broad = params.copy()
        params_broad['gl'] = 'us'
        results_us, err_us = _call_serpapi(params_broad)
        if results_us:
            shopping_results = results_us
            is_fallback = True
            api_error = ''  # Clear error since we got results

    # Log errors for debugging
    if api_error:
        print(f'  [SerpAPI Error] q="{query}" gl={country}: {api_error}')

    results = []
    for item in shopping_results:
        price = item.get('extracted_price')
        title = item.get('title', '')
        if not price or not title:
            continue  # skip incomplete entries

        # Handle old_price which can be dict or absent
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
    return jsonify(payload)


# ---------------------------------------------------------------------------
# API: Server status
# ---------------------------------------------------------------------------
@app.route('/api/status')
def api_status():
    return jsonify({
        'api_configured': bool(SERPAPI_KEY),
        'cache_entries': len(_cache),
        'cache_ttl_seconds': CACHE_TTL,
    })


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------
if __name__ == '__main__':
    print()
    print('=' * 52)
    print('  PriceReviewer -- Backend API Proxy')
    print('=' * 52)

    if SERPAPI_KEY:
        masked = SERPAPI_KEY[:6] + '...' + SERPAPI_KEY[-4:]
        print(f'  [OK] SerpAPI Key: {masked}')
    else:
        print('  [!] SERPAPI_KEY no configurada.')
        print('     Ejecuta antes de iniciar:')
        print('       set SERPAPI_KEY=tu_clave_aqui    (Windows)')
        print('       export SERPAPI_KEY=tu_clave_aqui (Linux/Mac)')
        print('     El sitio funcionara solo con datos demo.')

    print()
    print('  >>> Abriendo en: http://localhost:5000')
    print('=' * 52)
    print()

    app.run(host='127.0.0.1', port=5000, debug=True)
