/* ==========================================
   PriceReviewer — Application Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initScrollAnimations();
  initAds();

  // Detect currency/country first, then render page content
  PR.initCurrency(function() {
    var page = document.body.dataset.page;
    if (page === 'landing')  initLanding();
    if (page === 'results')  initResults();
    if (page === 'product')  initProduct();
  });
});

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu toggle
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Search bars (navbar + hero)
  document.querySelectorAll('.search-bar').forEach(initSearchBar);
}

/* ==========================================
   SEARCH BAR WITH AUTOCOMPLETE
   ========================================== */
function initSearchBar(searchBar) {
  var input = searchBar.querySelector('input');
  var suggestionsEl = searchBar.querySelector('.search-suggestions');
  var form = searchBar.closest('form') || searchBar;

  if (!input) return;

  var debounceTimer;
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      showSuggestions(input.value, suggestionsEl);
    }, 200);
  });

  input.addEventListener('focus', function () {
    if (input.value.trim().length > 0) {
      showSuggestions(input.value, suggestionsEl);
    }
  });

  document.addEventListener('click', function (e) {
    if (!searchBar.contains(e.target) && suggestionsEl) {
      suggestionsEl.classList.remove('open');
    }
  });

  // Handle form submission
  var searchBtn = searchBar.querySelector('.search-btn');
  function doSearch() {
    var q = input.value.trim();
    if (q) {
      window.location.href = 'results.html?q=' + encodeURIComponent(q);
    }
  }
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
  });
}

function showSuggestions(query, container) {
  if (!container) return;
  if (!query || query.trim().length < 2) {
    container.classList.remove('open');
    return;
  }
  var results = PR.searchProducts(query).slice(0, 6);
  if (results.length === 0) {
    container.classList.remove('open');
    return;
  }

  container.innerHTML = results.map(function (p) {
    var cat = PR.getCategory(p.category);
    var best = PR.getBestPrice(p);
    var priceStr = best ? PR.formatPrice(best.price) : '';
    return '<div class="suggestion-item" data-id="' + p.id + '">' +
      '<span class="suggestion-icon">' + p.image.icon + '</span>' +
      '<div style="flex:1">' +
        '<div class="suggestion-text">' + p.name + '</div>' +
        '<div class="suggestion-category">' + (cat ? cat.name : '') + (priceStr ? ' · desde ' + priceStr : '') + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  container.querySelectorAll('.suggestion-item').forEach(function (item) {
    item.addEventListener('click', function () {
      window.location.href = 'product.html?id=' + item.dataset.id;
    });
  });

  container.classList.add('open');
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  var elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
}

/* ==========================================
   AD SPACES
   ========================================== */
function initAds() {
  document.querySelectorAll('.ad-space').forEach(function (ad) {
    // In production, this would initialize AdSense / ad network code
    // For demo, we leave the placeholder styling from CSS
    // ad.dataset.loaded = 'true';

    // Placeholder simulated ad content
    var size = ad.dataset.adSize || '';
    if (!ad.querySelector('.ad-placeholder-content')) {
      var placeholder = document.createElement('div');
      placeholder.className = 'ad-placeholder-content';
      placeholder.style.cssText = 'display:flex;align-items:center;gap:8px;opacity:0.4;';
      placeholder.innerHTML = '📢 <span style="font-size:11px;letter-spacing:0.05em;">ANUNCIO · ' + size + '</span>';
      // Don't override the ::before, just add subtle content
    }
  });
}

/**
 * Function to replace demo ads with real ad code
 * Call this when integrating with an ad network
 */
function loadRealAd(adElement, adCode) {
  adElement.innerHTML = adCode;
  adElement.dataset.loaded = 'true';
}

/* ==========================================
   LANDING PAGE
   ========================================== */
function initLanding() {
  renderTrending();
  renderCategories();
}

function renderTrending() {
  var grid = document.getElementById('trending-grid');
  if (!grid) return;

  var trending = PR.products.filter(function (p) {
    return p.tags.indexOf('trending') !== -1 || p.tags.indexOf('bestseller') !== -1;
  }).slice(0, 8);

  grid.innerHTML = trending.map(function (p) {
    var best = PR.getBestPrice(p);
    var discount = PR.getMaxDiscount(p);
    var range = PR.getPriceRange(p);
    var store = best ? PR.getStore(best.storeId) : null;

    return '<a href="product.html?id=' + p.id + '" class="product-card">' +
      '<div class="product-card-image" style="background:linear-gradient(135deg,' + p.image.gradient[0] + ',' + p.image.gradient[1] + ')">' +
        '<div class="product-card-badges">' +
          (discount > 0 ? '<span class="badge badge-discount">-' + discount + '%</span>' : '') +
          (p.tags.indexOf('trending') !== -1 ? '<span class="badge badge-trending">🔥 Trending</span>' : '') +
        '</div>' +
        '<span style="position:relative;z-index:1;">' + p.image.icon + '</span>' +
      '</div>' +
      '<div class="product-card-body">' +
        '<div class="product-card-category">' + (PR.getCategory(p.category) || {}).name + '</div>' +
        '<div class="product-card-title">' + p.name + '</div>' +
        '<div class="product-card-prices">' +
          '<span class="product-card-price">' + (best ? PR.formatPrice(best.price) : 'N/A') + '</span>' +
          (best && best.originalPrice > best.price ? '<span class="product-card-price-original">' + PR.formatPrice(best.originalPrice) + '</span>' : '') +
        '</div>' +
        '<div class="product-card-store">' +
          (store ? '<span>' + store.icon + '</span><span>Mejor en ' + store.name + '</span>' : '') +
          '<span class="badge badge-stores" style="margin-left:auto;">' + p.prices.length + ' tiendas</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');
}

function renderCategories() {
  var grid = document.getElementById('categories-grid');
  if (!grid) return;

  grid.innerHTML = PR.categories.map(function (cat) {
    var count = PR.products.filter(function (p) { return p.category === cat.id; }).length;
    return '<a href="results.html?category=' + cat.id + '" class="category-card glass-card" ' +
      'style="--cat-color-1:' + cat.gradient[0] + ';--cat-color-2:' + cat.gradient[1] + ';">' +
      '<div class="category-icon">' + cat.icon + '</div>' +
      '<h3>' + cat.name + '</h3>' +
      '<p>' + count + ' productos</p>' +
    '</a>';
  }).join('');
}

/* ==========================================
   RESULTS PAGE
   ========================================== */
var currentFilters = { category: 'all', minPrice: null, maxPrice: null, stores: [], inStockOnly: false };
var currentSort = 'relevance';
var currentPage = 1;
var ITEMS_PER_PAGE = 8;

// Cached API results for filtering
var cachedApiResults = [];
var cachedApiFallback = false;

function initResults() {
  var params = new URLSearchParams(window.location.search);
  var query = params.get('q') || '';
  var category = params.get('category') || 'all';

  currentFilters.category = category;

  // Set search input value
  document.querySelectorAll('.search-bar input').forEach(function (input) {
    if (query) input.value = query;
  });

  // Set page title
  var titleEl = document.getElementById('results-title');
  if (titleEl) {
    if (query) {
      titleEl.textContent = 'Resultados para "' + query + '"';
    } else if (category !== 'all') {
      var cat = PR.getCategory(category);
      titleEl.textContent = cat ? cat.name : 'Productos';
    } else {
      titleEl.textContent = 'Todos los productos';
    }
  }

  // Render filters
  renderFilters();

  // Bind sort
  var sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentSort = sortSelect.value;
      currentPage = 1;
      renderResults(query);
      applyFiltersToApi();
    });
  }

  // Fetch real-time API results if there's a search query
  if (query) {
    fetchApiResults(query);
  } else {
    var apiSection = document.getElementById('api-results-section');
    if (apiSection) apiSection.style.display = 'none';
    var demoSep = document.getElementById('demo-separator');
    if (demoSep) demoSep.style.display = 'none';
  }

  // Initial render of demo/local results
  renderResults(query);
}

function renderFilters() {
  // Category filter buttons
  var catContainer = document.getElementById('filter-categories');
  if (catContainer) {
    var html = '<label class="checkbox-label"><input type="radio" name="cat" value="all" ' +
      (currentFilters.category === 'all' ? 'checked' : '') + '> Todas</label>';
    PR.categories.forEach(function (cat) {
      html += '<label class="checkbox-label"><input type="radio" name="cat" value="' + cat.id + '" ' +
        (currentFilters.category === cat.id ? 'checked' : '') + '> ' + cat.icon + ' ' + cat.name + '</label>';
    });
    catContainer.innerHTML = html;
    catContainer.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('change', function () {
        currentFilters.category = input.value;
        currentPage = 1;
        var query = new URLSearchParams(window.location.search).get('q') || '';
        renderResults(query);
        applyFiltersToApi();
      });
    });
  }

  // Store filter checkboxes
  var storeContainer = document.getElementById('filter-stores');
  if (storeContainer) {
    storeContainer.innerHTML = PR.stores.map(function (store) {
      return '<label class="checkbox-label"><input type="checkbox" value="' + store.id + '"> ' +
        store.icon + ' ' + store.name + '</label>';
    }).join('');
    storeContainer.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('change', function () {
        var checked = storeContainer.querySelectorAll('input:checked');
        currentFilters.stores = Array.from(checked).map(function (c) { return c.value; });
        currentPage = 1;
        var query = new URLSearchParams(window.location.search).get('q') || '';
        renderResults(query);
        applyFiltersToApi();
      });
    });
  }

  // Price range
  var priceMin = document.getElementById('price-min');
  var priceMax = document.getElementById('price-max');
  var priceBtn = document.getElementById('price-apply');
  if (priceBtn) {
    priceBtn.addEventListener('click', function () {
      currentFilters.minPrice = priceMin && priceMin.value ? Number(priceMin.value) : null;
      currentFilters.maxPrice = priceMax && priceMax.value ? Number(priceMax.value) : null;
      currentPage = 1;
      var query = new URLSearchParams(window.location.search).get('q') || '';
      renderResults(query);
      applyFiltersToApi();
    });
  }

  // In-stock toggle
  var stockToggle = document.getElementById('filter-stock');
  if (stockToggle) {
    stockToggle.addEventListener('change', function () {
      currentFilters.inStockOnly = stockToggle.checked;
      currentPage = 1;
      var query = new URLSearchParams(window.location.search).get('q') || '';
      renderResults(query);
      applyFiltersToApi();
    });
  }

  // Clear all filters
  var clearBtn = document.getElementById('clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      currentFilters = { category: 'all', minPrice: null, maxPrice: null, stores: [], inStockOnly: false };
      currentSort = 'relevance';
      currentPage = 1;

      // Reset UI elements
      var priceMin = document.getElementById('price-min');
      var priceMax = document.getElementById('price-max');
      if (priceMin) priceMin.value = '';
      if (priceMax) priceMax.value = '';
      var stockToggle = document.getElementById('filter-stock');
      if (stockToggle) stockToggle.checked = false;
      var sortSelect = document.getElementById('sort-select');
      if (sortSelect) sortSelect.value = 'relevance';

      // Reset category radios
      var catAll = document.querySelector('#filter-categories input[value="all"]');
      if (catAll) catAll.checked = true;

      // Uncheck all store checkboxes
      document.querySelectorAll('#filter-stores input').forEach(function (cb) { cb.checked = false; });

      // Re-render
      var query = new URLSearchParams(window.location.search).get('q') || '';
      renderResults(query);
      applyFiltersToApi();
    });
  }
}

/** Apply current filters to cached API results */
function applyFiltersToApi() {
  if (!cachedApiResults.length) return;

  var filtered = cachedApiResults.slice(); // copy

  // Filter by price range (use numeric price, convert if fallback)
  if (currentFilters.minPrice !== null) {
    var minVal = cachedApiFallback ? currentFilters.minPrice / (PR.currency.rate || 1) : currentFilters.minPrice;
    filtered = filtered.filter(function(item) { return item.price >= minVal; });
  }
  if (currentFilters.maxPrice !== null) {
    var maxVal = cachedApiFallback ? currentFilters.maxPrice / (PR.currency.rate || 1) : currentFilters.maxPrice;
    filtered = filtered.filter(function(item) { return item.price <= maxVal; });
  }

  // Filter by store name (match SerpAPI source against our store names)
  if (currentFilters.stores.length > 0) {
    filtered = filtered.filter(function(item) {
      var srcLower = (item.source || '').toLowerCase();
      return currentFilters.stores.some(function(storeId) {
        var store = PR.getStore(storeId);
        return store && srcLower.indexOf(store.name.toLowerCase()) !== -1;
      });
    });
  }

  // Sort
  if (currentSort === 'price-asc') {
    filtered.sort(function(a, b) { return a.price - b.price; });
  } else if (currentSort === 'price-desc') {
    filtered.sort(function(a, b) { return b.price - a.price; });
  } else if (currentSort === 'name') {
    filtered.sort(function(a, b) { return a.title.localeCompare(b.title); });
  } else if (currentSort === 'discount') {
    filtered.sort(function(a, b) {
      var dA = a.old_price ? ((a.old_price - a.price) / a.old_price) : 0;
      var dB = b.old_price ? ((b.old_price - b.price) / b.old_price) : 0;
      return dB - dA;
    });
  }

  // Re-render
  if (filtered.length > 0) {
    renderApiResultCards(filtered, false, cachedApiFallback);
  } else {
    var grid = document.getElementById('api-results-grid');
    if (grid) {
      grid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:2rem 0;">' +
          '<p style="color:var(--text-muted);">No hay resultados del API que coincidan con los filtros.</p>' +
          '<p style="color:var(--text-muted);font-size:0.85rem;">Ajusta los filtros para ver m\u00e1s resultados.</p>' +
        '</div>';
    }
  }
}

function renderResults(query) {
  var grid = document.getElementById('results-grid');
  var countEl = document.getElementById('results-count');
  if (!grid) return;

  // Search → Filter → Sort
  var products = PR.searchProducts(query);
  products = PR.filterProducts(products, currentFilters);
  products = PR.sortProducts(products, currentSort);

  // Count
  if (countEl) countEl.textContent = products.length + ' producto' + (products.length !== 1 ? 's' : '') + ' encontrado' + (products.length !== 1 ? 's' : '');

  // Pagination
  var totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  var start = (currentPage - 1) * ITEMS_PER_PAGE;
  var pageProducts = products.slice(start, start + ITEMS_PER_PAGE);

  if (pageProducts.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:4rem 0;">' +
      '<div style="font-size:3rem;margin-bottom:1rem;">🔍</div>' +
      '<h3 style="margin-bottom:0.5rem;">No se encontraron productos</h3>' +
      '<p style="color:var(--text-muted);">Intenta con otros términos de búsqueda o ajusta los filtros</p>' +
    '</div>';
    renderPagination(0);
    return;
  }

  var html = '';
  pageProducts.forEach(function (p, index) {
    var best = PR.getBestPrice(p);
    var discount = PR.getMaxDiscount(p);
    var range = PR.getPriceRange(p);
    var store = best ? PR.getStore(best.storeId) : null;

    html += '<a href="product.html?id=' + p.id + '" class="product-card animate-on-scroll delay-' + (index % 4 + 1) + '">' +
      '<div class="product-card-image" style="background:linear-gradient(135deg,' + p.image.gradient[0] + ',' + p.image.gradient[1] + ')">' +
        '<div class="product-card-badges">' +
          (discount > 0 ? '<span class="badge badge-discount">-' + discount + '%</span>' : '') +
          (p.tags.indexOf('bestseller') !== -1 ? '<span class="badge badge-best-price">⭐ Bestseller</span>' : '') +
        '</div>' +
        '<span style="position:relative;z-index:1;">' + p.image.icon + '</span>' +
      '</div>' +
      '<div class="product-card-body">' +
        '<div class="product-card-category">' + (PR.getCategory(p.category) || {}).name + '</div>' +
        '<div class="product-card-title">' + p.name + '</div>' +
        '<div class="product-card-prices">' +
          '<span class="product-card-price">' + PR.formatPrice(range.min) + '</span>' +
          (range.min !== range.max ? '<span style="color:var(--text-muted);font-size:var(--text-sm);">- ' + PR.formatPrice(range.max) + '</span>' : '') +
        '</div>' +
        '<div class="product-card-store">' +
          (store ? '<span>' + store.icon + '</span><span>Mejor: ' + store.name + '</span>' : '') +
          '<span class="badge badge-stores" style="margin-left:auto;">' + p.prices.length + ' tiendas</span>' +
        '</div>' +
      '</div>' +
    '</a>';

    // Insert in-feed ad every 4 products
    if ((index + 1) % 4 === 0 && index < pageProducts.length - 1) {
      html += '<div class="ad-space ad-infeed" data-ad-size="responsive" style="grid-column:1/-1;"><span class="ad-label">Anuncio</span></div>';
    }
  });

  grid.innerHTML = html;
  initScrollAnimations(); // re-initialize for new elements
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  var pagEl = document.getElementById('pagination');
  if (!pagEl || totalPages <= 1) {
    if (pagEl) pagEl.innerHTML = '';
    return;
  }

  var html = '';
  html += '<button class="btn btn-sm btn-secondary page-btn" data-page="' + (currentPage - 1) + '" ' + (currentPage <= 1 ? 'disabled' : '') + '>← Anterior</button>';
  for (var i = 1; i <= totalPages; i++) {
    html += '<button class="btn btn-sm ' + (i === currentPage ? 'btn-primary' : 'btn-ghost') + ' page-btn" data-page="' + i + '">' + i + '</button>';
  }
  html += '<button class="btn btn-sm btn-secondary page-btn" data-page="' + (currentPage + 1) + '" ' + (currentPage >= totalPages ? 'disabled' : '') + '>Siguiente →</button>';

  pagEl.innerHTML = html;
  pagEl.querySelectorAll('.page-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var page = parseInt(btn.dataset.page);
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        var query = new URLSearchParams(window.location.search).get('q') || '';
        renderResults(query);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================
   REAL-TIME API RESULTS (Google Shopping via SerpAPI)
   ========================================== */
function fetchApiResults(query) {
  var section = document.getElementById('api-results-section');
  var demoSep = document.getElementById('demo-separator');
  if (!section) return;

  section.style.display = 'block';
  section.innerHTML =
    '<div class="api-results-header">' +
      '<h2>🌐 Resultados en <span class="text-gradient">Tiempo Real</span></h2>' +
      '<p class="text-muted">Buscando en Google Shopping...</p>' +
    '</div>' +
    '<div class="api-results-grid" id="api-results-grid">' +
      '<div class="skeleton-card"><div class="skeleton skeleton-image"></div><div style="padding:1rem;"><div class="skeleton skeleton-text lg"></div><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text" style="width:60%"></div></div></div>' +
      '<div class="skeleton-card"><div class="skeleton skeleton-image"></div><div style="padding:1rem;"><div class="skeleton skeleton-text lg"></div><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text" style="width:60%"></div></div></div>' +
      '<div class="skeleton-card"><div class="skeleton skeleton-image"></div><div style="padding:1rem;"><div class="skeleton skeleton-text lg"></div><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text" style="width:60%"></div></div></div>' +
      '<div class="skeleton-card"><div class="skeleton skeleton-image"></div><div style="padding:1rem;"><div class="skeleton skeleton-text lg"></div><div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text" style="width:60%"></div></div></div>' +
    '</div>';

  fetch('/api/search?q=' + encodeURIComponent(query) + '&country=' + (PR.currency.country || 'us'))
    .then(function(r) {
      // Always try to parse JSON, even on error status codes
      return r.json().catch(function() {
        return { results: [], api_available: true, api_error: 'Error de servidor (' + r.status + ')' };
      });
    })
    .then(function(data) {
      if (data.results && data.results.length > 0) {
        
        // Filter out junk/accessories if the user didn't explicitly search for them
        // Filter out junk/accessories if the user didn't explicitly search for them
        var filterWords = ['case', 'funda', 'cover', 'protector', 'mica', 'cable', 'cargador', 'charger', 'silicone', 'vidrio templado', 'correa', 'band'];
        var planWords = ['plan', 'monthly', 'cuotas', 'pago mensual', 'meses', 'locked', 'at&t', 'verizon', 't-mobile', 'tmobile', 'sprint', 'cricket', 'tracfone'];
        var qNorm = query.toLowerCase();
        
        var colors = ['black', 'white', 'pink', 'blue', 'green', 'yellow', 'red', 'purple', 'titanium', 'natural', 'desert', 'midnight', 'starlight', 'silver', 'space gray', 'gold', 'negro', 'blanco', 'rosa', 'azul', 'verde', 'amarillo', 'rojo', 'morado', 'plateado', 'dorado', 'gris'];

        data.results = data.results.filter(function(r) {
           var t = (r.title || '').toLowerCase();
           var isAccessory = filterWords.some(function(w) { return t.indexOf(w) !== -1; });
           var isPlan = planWords.some(function(w) { return t.indexOf(w) !== -1; });
           var queryHasAccessory = filterWords.some(function(w) { return qNorm.indexOf(w) !== -1; });
           return (queryHasAccessory || !isAccessory) && !isPlan;
        });

        // Apply USD to PEN conversion to all items
        var exchangeRate = 3.80; // 1 USD = 3.80 PEN
        data.results.forEach(function(r) {
          var isUSStore = ['amazon', 'ebay', 'best buy', 'walmart', 'newegg', 'target', 'b&h'].some(function(s) { return (r.source||'').toLowerCase().indexOf(s) !== -1; });
          if (r.currency === 'USD' || isUSStore || r.price < 500 && (r.title||'').toLowerCase().indexOf('iphone') !== -1) { // iPhone under 500 is likely USD
            r.price = (r.price || 0) * exchangeRate;
            if (r.old_price) r.old_price = r.old_price * exchangeRate;
            r.converted_to_pen = true;
          }

          // Clean up the link (SerpAPI sometimes returns relative google redirects or broken links)
          var storeHref = r.link;
          if (!storeHref || storeHref === '#' || storeHref.indexOf('http') !== 0 || storeHref.indexOf('google.com') !== -1) {
            storeHref = PR.getStoreSearchUrl(r.source || '', r.title || '');
          }
          r.clean_link = storeHref;
        });

        // Group by product title, capacity, and color
        var groups = {};
        data.results.forEach(function(r) {
          var t = (r.title || 'Producto').toLowerCase();
          
          var capacityMatch = t.match(/(\d+)\s*(gb|tb)/);
          var capacity = capacityMatch ? capacityMatch[0].replace(/\s+/g, '').toUpperCase() : '';
          
          var color = '';
          for (var i = 0; i < colors.length; i++) {
            if (t.indexOf(colors[i]) !== -1) {
              color = colors[i].charAt(0).toUpperCase() + colors[i].slice(1);
              break;
            }
          }
          
          var isUsed = t.indexOf('used') !== -1 || t.indexOf('refurbished') !== -1 || t.indexOf('pre-owned') !== -1 || t.indexOf('restored') !== -1 || t.indexOf('reacondicionado') !== -1 || t.indexOf('usado') !== -1;
          var condition = isUsed ? 'Usado/Refurbished' : '';

          var cleanTitle = t
            .replace(/apple/g, '').replace(/samsung/g, '').replace(/smartphone/g, '').replace(/unlocked/g, '').replace(/desbloqueado/g, '').replace(/5g/g, '').replace(/new/g, '').replace(/used/g, '').replace(/refurbished/g, '').replace(/pre-owned/g, '').replace(/restored/g, '').replace(new RegExp((color||'xxxxxx').toLowerCase(), 'g'), '').replace(/(\d+)\s*(gb|tb)/g, '').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
          
          var baseModel = cleanTitle;
          if (baseModel.length < 4) baseModel = query.toLowerCase();
          baseModel = baseModel.split(' ').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');

          var smartTitle = baseModel;
          if (capacity) smartTitle += ' ' + capacity;
          if (color) smartTitle += ' ' + color;
          if (condition) smartTitle += ' (' + condition + ')';
          
          var smartKey = smartTitle.toLowerCase();

          if (!groups[smartKey]) {
            groups[smartKey] = {
              title: smartTitle,
              thumbnail: r.thumbnail,
              offers: [],
              api_id: 'grp_' + Object.keys(groups).length
            };
          }
          groups[smartKey].offers.push(r);
        });

        var groupedResults = Object.keys(groups).map(function(k) {
          var g = groups[k];
          var bestPrice = Math.min.apply(null, g.offers.map(function(o) { return o.price || 999999; }));
          var oldPrice = Math.max.apply(null, g.offers.map(function(o) { return o.old_price || 0; }));
          if (oldPrice <= bestPrice) oldPrice = null;
          
          var stores = g.offers.map(function(o) { return o.source; }).filter(function(v, i, a) { return a.indexOf(v) === i; });
          
          return {
            api_id: g.api_id,
            title: g.title,
            thumbnail: g.thumbnail,
            price: bestPrice,
            old_price: oldPrice,
            store_count: g.offers.length,
            stores: stores,
            source: stores.length + (stores.length === 1 ? ' tienda' : ' tiendas') + (g.offers.some(function(o) { return o.converted_to_pen; }) ? ' (Aprox. USD a PEN)' : ''),
            is_group: true,
            raw_offers: g.offers
          };
        });

        // Prioritize groups with local stores
        var localStores = ['mercado libre', 'mercadolibre', 'falabella', 'ripley', 'oechsle', 'hiraoka', 'coolbox', 'plaza vea'];
        groupedResults.sort(function(a, b) {
          var aLocal = a.stores.some(function(s) { return localStores.some(function(l) { return s.toLowerCase().indexOf(l) !== -1; }); }) ? -1 : 1;
          var bLocal = b.stores.some(function(s) { return localStores.some(function(l) { return s.toLowerCase().indexOf(l) !== -1; }); }) ? -1 : 1;
          if (aLocal !== bLocal) return aLocal - bLocal;
          return (a.price || 0) - (b.price || 0);
        });
        
        sessionStorage.setItem('PR_LAST_SEARCH', JSON.stringify({ query: query, results: groupedResults }));

        // Cache results for filtering
        cachedApiResults = groupedResults;
        cachedApiFallback = !!data.is_fallback;
        // Show API results and the demo separator
        renderApiResultCards(groupedResults, data.from_cache, data.is_fallback);
        if (demoSep) demoSep.style.display = 'flex';
      } else if (data.api_available === false) {
        section.innerHTML =
          '<div class="api-unavailable">' +
            '<p>💡 <strong>API no configurada.</strong> Mostrando datos de demostración. ' +
            'Configura tu clave <code>SERPAPI_KEY</code> para ver resultados en tiempo real.</p>' +
          '</div>';
        if (demoSep) demoSep.style.display = 'none';
      } else if (data.api_error) {
        // Show specific API error with helpful message
        var errorMsg = data.api_error;
        var helpText = '';
        if (errorMsg.indexOf('Invalid API key') !== -1 || errorMsg.indexOf('Wrong API key') !== -1) {
          helpText = 'Verifica tu clave SERPAPI_KEY en el archivo .env';
        } else if (errorMsg.indexOf('rate limit') !== -1 || errorMsg.indexOf('limit') !== -1) {
          helpText = 'Se alcanzó el límite de búsquedas. Intenta más tarde.';
        } else if (errorMsg.indexOf('Your account') !== -1) {
          helpText = 'Revisa el estado de tu cuenta en serpapi.com';
        } else {
          helpText = 'Mostrando datos de demostración disponibles.';
        }
        section.innerHTML =
          '<div class="api-unavailable">' +
            '<p>⚠️ <strong>Error del API:</strong> ' + escapeHtml(errorMsg.substring(0, 120)) + '</p>' +
            '<p class="text-muted" style="margin-top:0.5rem;">' + helpText + '</p>' +
          '</div>';
        if (demoSep) demoSep.style.display = 'none';
      } else {
        section.innerHTML =
          '<div class="api-results-header">' +
            '<h2>🌐 Resultados en Tiempo Real</h2>' +
            '<p class="text-muted">No se encontraron resultados en Google Shopping para "' + escapeHtml(query) + '"</p>' +
            '<p class="text-muted" style="font-size:0.85rem;">Intenta con otros términos: "corsair gaming chair", "silla gamer"</p>' +
          '</div>';
        if (demoSep) demoSep.style.display = 'none';
      }
    })
    .catch(function(err) {
      section.innerHTML =
        '<div class="api-unavailable">' +
          '<p>💡 No se pudo conectar al servidor. Verifica que esté corriendo con <code>python server.py</code></p>' +
        '</div>';
      if (demoSep) demoSep.style.display = 'none';
    });
}

function renderApiResultCards(results, fromCache, isFallback) {
  var grid = document.getElementById('api-results-grid');
  var section = document.getElementById('api-results-section');
  if (!grid || !section) return;

  // Update header
  var header = section.querySelector('.api-results-header');
  if (header) {
    var subtitle = isFallback
      ? results.length + ' productos de tiendas internacionales (sin resultados locales)'
      : results.length + ' productos encontrados en Google Shopping';
    header.innerHTML =
      '<h2>🌐 Resultados en <span class="text-gradient">Tiempo Real</span>' +
        (fromCache ? ' <span class="badge badge-stores" style="font-size:10px;vertical-align:middle;">cache</span>' : '') +
      '</h2>' +
      '<p class="text-muted">' + subtitle + '</p>';
  }

  // Remove previous local stores section if re-rendering (from filters)
  var oldLocal = section.querySelector('.local-stores-section');
  if (oldLocal) oldLocal.remove();

  grid.innerHTML = results.map(function(item, idx) {
    var discount = 0;
    if (item.old_price && item.old_price > item.price) {
      discount = Math.round(((item.old_price - item.price) / item.old_price) * 100);
    }

    var ratingHtml = '';
    if (item.rating && !item.is_group) {
      ratingHtml = '<div class="api-card-rating">' + PR.renderStars(item.rating) +
        '<span class="rating-score">' + item.rating + '</span>' +
        (item.reviews ? '<span class="rating-count">(' + item.reviews.toLocaleString() + ')</span>' : '') +
      '</div>';
    }

    var deliveryHtml = '';
    if (item.delivery) {
      deliveryHtml = '<div class="api-card-delivery">🚚 ' + item.delivery + '</div>';
    }

    // Link to our Product Page
    var href = 'product.html?api_idx=' + item.api_id;

    // We convert everything to local display now
    var priceDisplay = PR.formatLocalPrice ? PR.formatLocalPrice(item.price) : 'S/ ' + Math.round(item.price);
    var oldPriceDisplay = '';
    if (item.old_price) {
      oldPriceDisplay = PR.formatLocalPrice ? PR.formatLocalPrice(item.old_price) : 'S/ ' + Math.round(item.old_price);
    }

    return '<a href="' + href + '" class="api-card animate-on-scroll delay-' + ((idx % 4) + 1) + '">' +
      '<div class="api-card-image">' +
        (item.thumbnail
          ? '<img src="' + item.thumbnail + '" alt="' + escapeHtml(item.title) + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">'
            + '<div class="api-card-placeholder" style="display:none;">📦</div>'
          : '<div class="api-card-placeholder">📦</div>') +
        '<div class="api-card-badges">' +
          '<span class="badge badge-live">⚡ En vivo</span>' +
          (discount > 0 ? '<span class="badge badge-discount">-' + discount + '%</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="api-card-body">' +
        '<div class="api-card-source" style="' + (item.source.indexOf('Aprox') !== -1 ? 'color:var(--warning);' : '') + '">' + escapeHtml(item.source) + '</div>' +
        '<div class="api-card-title">' + escapeHtml(item.title) + '</div>' +
        '<div class="api-card-prices">' +
          '<span class="api-card-price"><span style="font-size:0.7em;font-weight:normal;color:var(--text-muted);">' + (item.is_group ? 'Desde ' : '') + '</span>' + priceDisplay + '</span>' +
          (oldPriceDisplay ? '<span class="api-card-price-old">' + oldPriceDisplay + '</span>' : '') +
        '</div>' +
        ratingHtml +
        deliveryHtml +
      '</div>' +
      '<div class="api-card-footer">' +
        '<span class="btn btn-sm btn-success" style="width:100%;">Comparar ' + (item.is_group ? item.stores.length : '1') + ' Tiendas →</span>' +
      '</div>' +
    '</a>';
  }).join('');

  // Add "Buscar en tiendas peruanas" section after API results
  var query = new URLSearchParams(window.location.search).get('q') || '';
  if (query) {
    var localStoresHtml =
      '<div class="local-stores-section" style="margin-top:var(--s5);padding:var(--s5);background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:var(--r-xl);">' +
        '<h3 style="font-size:var(--text-base);margin-bottom:var(--s3);display:flex;align-items:center;gap:var(--s2);">' +
          '<span>🇵🇪</span> Buscar también en tiendas peruanas' +
        '</h3>' +
        '<div style="display:flex;flex-wrap:wrap;gap:var(--s2);">';

    // Only show local (Peruvian) stores, not international ones
    var localIds = ['mercadolibre', 'falabella', 'ripley', 'oechsle', 'plazavea', 'hiraoka', 'coolbox'];
    localIds.forEach(function(storeId) {
      var store = PR.getStore(storeId);
      if (!store) return;
      var searchUrl = PR.getStoreSearchUrl(store.name, query);
      localStoresHtml +=
        '<a href="' + searchUrl + '" target="_blank" rel="noopener noreferrer" ' +
          'style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;' +
          'background:' + store.color + '22;border:1px solid ' + store.color + '44;' +
          'border-radius:var(--r-lg);font-size:var(--text-sm);font-weight:600;' +
          'color:var(--text-primary);text-decoration:none;transition:all 0.2s;" ' +
          'onmouseover="this.style.background=\'' + store.color + '33\';this.style.transform=\'translateY(-2px)\'" ' +
          'onmouseout="this.style.background=\'' + store.color + '22\';this.style.transform=\'none\'">' +
          store.icon + ' ' + store.name +
        '</a>';
    });

    localStoresHtml += '</div></div>';

    // Insert after the grid
    grid.insertAdjacentHTML('afterend', localStoresHtml);
  }

  initScrollAnimations();
}

/** Escape HTML to prevent XSS from API data */
function escapeHtml(str) {
  if (!str) return '';
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ==========================================
   PRODUCT PAGE
   ========================================== */
function initProduct() {
  try {
    var params = new URLSearchParams(window.location.search);
    var apiIdx = params.get('api_idx');
    var productId = params.get('id');

    var product;

  // Handle dynamic product from API search
  if (apiIdx !== null) {
    try {
      var searchData = JSON.parse(sessionStorage.getItem('PR_LAST_SEARCH'));
      if (searchData && searchData.results) {
        var item = searchData.results.find(function(r) { return r.api_id == apiIdx; });
        if (item) {
          // Generate synthetic history based on current price
          var p = item.price || 0;
          var history = [];
          var date = new Date();
          for (var i = 5; i >= 0; i--) {
            var d = new Date(date.getFullYear(), date.getMonth() - i, 1);
            var m = (d.getMonth() + 1).toString().padStart(2, '0');
            var factor = 1 + (i * 0.05) + (Math.random() * 0.02);
            history.push({ date: d.getFullYear() + '-' + m, price: i === 0 ? p : p * factor });
          }

          // Map the raw offers from the group into the prices array
          var prices = (item.raw_offers || []).map(function(r) {
            var sourceStr = r.source || 'Tienda';
            var storeId = sourceStr.toLowerCase().replace(/[^a-z0-9]/g, '');
            var shipping = r.delivery && r.delivery.toLowerCase().indexOf('gratis') !== -1 ? 0 : Math.floor(Math.random() * 15) + 5;
            return {
              storeId: storeId,
              storeNameOriginal: sourceStr,
              ratingOriginal: r.rating || (4 + Math.random()),
              price: r.price,
              originalPrice: r.old_price || r.price,
              shipping: shipping,
              deliveryDays: Math.floor(Math.random() * 5) + 1,
              inStock: true,
              link: r.clean_link || r.link
            };
          });

          product = {
            id: 'api-' + apiIdx,
            name: item.title || 'Producto',
            category: 'electronics',
            description: 'Producto encontrado en múltiples tiendas vía búsqueda en tiempo real.',
            image: { 
              icon: item.thumbnail ? '<img src="' + item.thumbnail + '" style="width:100%;height:100%;object-fit:contain;border-radius:var(--r-2xl);">' : '📦', 
              gradient: ['#1e293b', '#0f172a'] 
            },
            tags: ['trending'],
            prices: prices,
            priceHistory: history
          };
        }
      }
    } catch(e) { console.error('Error loading session data', e); }
  }

  // Fallback to static product
  if (!product && productId) {
    product = PR.getProduct(productId);
  }

    if (!product) { 
      document.getElementById('product-name').textContent = "Producto no encontrado";
      document.getElementById('product-description').textContent = "Por favor realiza la búsqueda nuevamente.";
      return;
    }

    renderProductDetail(product);
    renderComparisonTable(product);
    renderPriceChart(product);
    renderRelatedProducts(product);
    initPriceAlert(product);
  } catch (e) {
    console.error(e);
    document.getElementById('product-name').textContent = "Error interno";
    document.getElementById('product-description').innerHTML = "Ocurrió un error al cargar el producto:<br><code style='color:red;'>" + e.message + "</code>";
  }
}

function renderProductDetail(product) {
  var cat = PR.getCategory(product.category);
  var best = PR.getBestPrice(product);
  var reliable = PR.getMostReliable(product);
  var discount = PR.getMaxDiscount(product);

  // Breadcrumbs
  var breadcrumbs = document.getElementById('breadcrumbs');
  if (breadcrumbs) {
    breadcrumbs.innerHTML = '<a href="index.html">Inicio</a><span class="separator">›</span>' +
      (cat ? '<a href="results.html?category=' + cat.id + '">' + cat.name + '</a><span class="separator">›</span>' : '') +
      '<span class="current">' + product.name + '</span>';
  }

  // Product image
  var imageEl = document.getElementById('product-image');
  if (imageEl) {
    imageEl.style.background = 'linear-gradient(135deg,' + product.image.gradient[0] + ',' + product.image.gradient[1] + ')';
    imageEl.innerHTML = '<span style="font-size:6rem;position:relative;z-index:1;">' + product.image.icon + '</span>';
  }

  // Product info
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;

  var catBadge = document.getElementById('product-category');
  if (catBadge && cat) {
    catBadge.innerHTML = '<span class="badge badge-category">' + cat.icon + ' ' + cat.name + '</span>';
    product.tags.forEach(function (tag) {
      catBadge.innerHTML += '<span class="badge badge-' + (tag === 'trending' ? 'trending' : 'best-price') + '">' +
        (tag === 'trending' ? '🔥 Trending' : '⭐ Bestseller') + '</span>';
    });
  }

  var bestEl = document.getElementById('best-price-box');
  if (bestEl && best) {
    var bestStore = PR.getStore(best.storeId) || { name: best.storeNameOriginal || 'Tienda', icon: '🛒', rating: best.ratingOriginal || 4.5 };
    var bestLink = best.link ? best.link : PR.generateAffiliateLink(best.storeId, best);
    bestEl.innerHTML =
      '<div class="best-price-label">💰 Mejor Precio</div>' +
      '<div class="best-price-value">' + PR.formatPrice(best.price) + '</div>' +
      (best.originalPrice > best.price ? '<div class="best-price-original">' + PR.formatPrice(best.originalPrice) + ' <span class="badge badge-discount">-' + discount + '%</span></div>' : '') +
      '<div class="best-price-store">' + bestStore.icon + ' ' + bestStore.name + ' · ' + PR.renderStars(bestStore.rating) + '</div>' +
      (best.shipping === 0 ? '<div class="best-price-shipping">🚚 Envío gratis</div>' : '<div class="best-price-shipping">🚚 Envío: ' + PR.formatPrice(best.shipping) + '</div>') +
      '<a href="' + bestLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-success btn-lg" style="width:100%;margin-top:var(--s4);">Comprar Ahora →</a>';
  }

  var reliableEl = document.getElementById('reliable-box');
  if (reliableEl && reliable && reliable.storeId !== (best ? best.storeId : '')) {
    var relStore = PR.getStore(reliable.storeId) || { name: reliable.storeNameOriginal || 'Tienda', icon: '🛡️', rating: reliable.ratingOriginal || 4.8 };
    var relLink = reliable.link ? reliable.link : PR.generateAffiliateLink(reliable.storeId, reliable);
    reliableEl.innerHTML =
      '<div class="reliable-label">🛡️ Más Confiable</div>' +
      '<div class="reliable-price">' + PR.formatPrice(reliable.price) + '</div>' +
      '<div class="reliable-store">' + relStore.icon + ' ' + relStore.name + ' · ' + PR.renderStars(relStore.rating) + '</div>' +
      '<div class="reliable-rating">Calificación: <strong>' + (typeof relStore.rating === 'number' ? relStore.rating.toFixed(1) : relStore.rating) + '/5.0</strong></div>' +
      '<a href="' + relLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width:100%;margin-top:var(--s3);">Ver en ' + relStore.name + ' →</a>';
  } else if (reliableEl) {
    reliableEl.style.display = 'none';
  }

  // Page title
  document.title = product.name + ' — Comparar Precios | PriceReviewer';
}

function renderComparisonTable(product) {
  var container = document.getElementById('comparison-table');
  if (!container) return;

  // Sort by total price (price + shipping)
  var sorted = product.prices.slice().sort(function (a, b) {
    return (a.price + (a.shipping || 0)) - (b.price + (b.shipping || 0));
  });

  var bestTotal = sorted[0] ? sorted[0].price + (sorted[0].shipping || 0) : 0;

  var html = '<div class="comparison-header">' +
    '<span>Tienda</span><span>Precio</span><span>Envío</span><span>Entrega</span><span>Stock</span><span>Comprar</span>' +
  '</div>';

  sorted.forEach(function (entry, idx) {
    var store = PR.getStore(entry.storeId) || {
      name: entry.storeNameOriginal || 'Tienda',
      icon: '🛒',
      color: '#6366f1',
      rating: entry.ratingOriginal ? parseFloat(entry.ratingOriginal) : 4.5
    };
    var total = entry.price + (entry.shipping || 0);
    var isBest = idx === 0;
    var entryLink = entry.link ? entry.link : PR.generateAffiliateLink(entry.storeId, entry);

    html += '<div class="store-row' + (isBest ? ' best' : '') + '">' +
      '<div class="store-info">' +
        '<div class="store-icon" style="background:' + store.color + '20;color:' + store.color + '">' + store.icon + '</div>' +
        '<div><div class="store-name">' + store.name + (isBest ? ' <span class="badge badge-best-price" style="font-size:10px;">Mejor</span>' : '') + '</div>' +
          '<div class="rating">' + PR.renderStars(store.rating) + '<span class="rating-score">' + (typeof store.rating === 'number' ? store.rating.toFixed(1) : store.rating) + '</span></div>' +
        '</div>' +
      '</div>' +
      '<div><div class="store-price">' + PR.formatPrice(entry.price) + '</div>' +
        (entry.originalPrice > entry.price ? '<div class="store-price-original">' + PR.formatPrice(entry.originalPrice) + '</div>' : '') +
      '</div>' +
      '<div class="store-shipping ' + (entry.shipping === 0 ? 'free' : '') + '">' + (entry.shipping === 0 ? 'Gratis' : PR.formatPrice(entry.shipping)) + '</div>' +
      '<div class="store-delivery">' + entry.deliveryDays + ' día' + (entry.deliveryDays !== 1 ? 's' : '') + '</div>' +
      '<div class="store-stock ' + (entry.inStock ? 'in-stock' : 'out-of-stock') + '">' + (entry.inStock ? '✓ Disponible' : '✗ Agotado') + '</div>' +
      '<div>' +
        (entry.inStock ?
          '<a href="' + entryLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-sm ' + (isBest ? 'btn-primary' : 'btn-secondary') + '">Comprar</a>'
        : '<span class="text-muted text-xs">No disponible</span>') +
      '</div>' +
    '</div>';
  });

  container.innerHTML = html;
}

/* ==========================================
   PRICE HISTORY CHART (Canvas)
   ========================================== */
function renderPriceChart(product) {
  var canvas = document.getElementById('price-chart');
  if (!canvas || !product.priceHistory || product.priceHistory.length < 2) return;

  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 260 * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = '260px';
  ctx.scale(dpr, dpr);

  var w = rect.width;
  var h = 260;
  var padding = { top: 30, right: 20, bottom: 40, left: 60 };
  var chartW = w - padding.left - padding.right;
  var chartH = h - padding.top - padding.bottom;

  var data = product.priceHistory;
  var prices = data.map(function (d) { return d.price; });
  var minP = Math.min.apply(null, prices) * 0.95;
  var maxP = Math.max.apply(null, prices) * 1.05;
  var rangeP = maxP - minP || 1;

  // Background
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (var i = 0; i <= 4; i++) {
    var y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();

    // Y labels
    var price = maxP - (rangeP / 4) * i;
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('$' + Math.round(price), padding.left - 8, y + 4);
  }

  // Data points
  var points = data.map(function (d, idx) {
    return {
      x: padding.left + (chartW / (data.length - 1)) * idx,
      y: padding.top + chartH - ((d.price - minP) / rangeP) * chartH,
      price: d.price,
      date: d.date
    };
  });

  // Gradient fill under the line
  var gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, h - padding.bottom);
  points.forEach(function (p) { ctx.lineTo(p.x, p.y); });
  ctx.lineTo(points[points.length - 1].x, h - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (var j = 1; j < points.length; j++) {
    var xc = (points[j - 1].x + points[j].x) / 2;
    var yc = (points[j - 1].y + points[j].y) / 2;
    ctx.quadraticCurveTo(points[j - 1].x, points[j - 1].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots
  points.forEach(function (p, idx) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, idx === points.length - 1 ? 5 : 3, 0, Math.PI * 2);
    ctx.fillStyle = idx === points.length - 1 ? '#6366f1' : '#818cf8';
    ctx.fill();
    if (idx === points.length - 1) {
      ctx.strokeStyle = 'rgba(99,102,241,0.3)';
      ctx.lineWidth = 6;
      ctx.stroke();
    }
  });

  // X labels
  ctx.fillStyle = '#64748b';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  points.forEach(function (p, idx) {
    if (idx % Math.ceil(points.length / 6) === 0 || idx === points.length - 1) {
      ctx.fillText(p.date, p.x, h - padding.bottom + 20);
    }
  });

  // Current price label
  var last = points[points.length - 1];
  ctx.fillStyle = '#6366f1';
  ctx.font = 'bold 13px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('$' + last.price, last.x + 10, last.y + 4);

  // Chart tooltip on hover
  canvas.addEventListener('mousemove', function (e) {
    var canvasRect = canvas.getBoundingClientRect();
    var mx = e.clientX - canvasRect.left;

    // Find nearest point
    var nearest = null;
    var nearestDist = Infinity;
    points.forEach(function (p) {
      var dist = Math.abs(p.x - mx);
      if (dist < nearestDist) { nearestDist = dist; nearest = p; }
    });

    if (nearest && nearestDist < 30) {
      canvas.style.cursor = 'crosshair';
      canvas.title = nearest.date + ': $' + nearest.price;
    } else {
      canvas.style.cursor = 'default';
      canvas.title = '';
    }
  });
}

function renderRelatedProducts(product) {
  var container = document.getElementById('related-products');
  if (!container) return;

  var related = PR.products.filter(function (p) {
    return p.category === product.category && p.id !== product.id;
  }).slice(0, 4);

  if (related.length === 0) {
    // Get any products
    related = PR.products.filter(function (p) { return p.id !== product.id; }).slice(0, 4);
  }

  container.innerHTML = related.map(function (p) {
    var best = PR.getBestPrice(p);
    return '<a href="product.html?id=' + p.id + '" class="product-card">' +
      '<div class="product-card-image" style="background:linear-gradient(135deg,' + p.image.gradient[0] + ',' + p.image.gradient[1] + ');height:140px;font-size:2.5rem;">' +
        '<span style="position:relative;z-index:1;">' + p.image.icon + '</span>' +
      '</div>' +
      '<div class="product-card-body" style="padding:var(--s3) var(--s4);">' +
        '<div class="product-card-title" style="font-size:var(--text-sm);">' + p.name + '</div>' +
        '<div class="product-card-price">' + (best ? PR.formatPrice(best.price) : 'N/A') + '</div>' +
      '</div>' +
    '</a>';
  }).join('');
}

function initPriceAlert(product) {
  var form = document.getElementById('price-alert-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.querySelector('input[type="email"]').value;
    var targetPrice = form.querySelector('input[type="number"]').value;
    if (email && targetPrice) {
      // In production: send to backend API
      var successEl = document.getElementById('alert-success');
      if (successEl) {
        successEl.style.display = 'block';
        successEl.textContent = '✓ ¡Alerta creada! Te notificaremos a ' + email + ' cuando el precio baje a $' + targetPrice;
        form.reset();
        setTimeout(function () { successEl.style.display = 'none'; }, 5000);
      }
    }
  });
}
