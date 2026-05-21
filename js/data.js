/* ==========================================
   PriceReviewer — Demo Data & Helpers
   ========================================== */

const PR = window.PR || {};

/* ---------- STORES (Peru + Internacional) ---------- */
PR.stores = [
  { id: 'mercadolibre', name: 'Mercado Libre',  icon: '🤝', rating: 4.5, color: '#FFE600', url: 'https://www.mercadolibre.com.pe',  searchUrl: 'https://listado.mercadolibre.com.pe/{query}',              affiliateParam: 'aff=pricereview',          affiliateEnabled: true },
  { id: 'falabella',    name: 'Falabella',      icon: '🏢', rating: 4.2, color: '#AAD500', url: 'https://www.falabella.com.pe',    searchUrl: 'https://www.falabella.com.pe/search?Ntt={query}',          affiliateParam: 'utm_source=pricereview',   affiliateEnabled: false },
  { id: 'ripley',       name: 'Ripley',         icon: '🏬', rating: 4.0, color: '#8B1A8E', url: 'https://simple.ripley.com.pe',    searchUrl: 'https://simple.ripley.com.pe/search?q={query}',            affiliateParam: 'utm_source=pricereview',   affiliateEnabled: false },
  { id: 'oechsle',      name: 'Oechsle',        icon: '🏪', rating: 3.8, color: '#E31837', url: 'https://www.oechsle.pe',          searchUrl: 'https://www.oechsle.pe/search?q={query}',                  affiliateParam: 'utm_source=pricereview',   affiliateEnabled: false },
  { id: 'plazavea',     name: 'PlazaVea',       icon: '🛒', rating: 3.7, color: '#00A650', url: 'https://www.plazavea.com.pe',     searchUrl: 'https://www.plazavea.com.pe/search?_query={query}',        affiliateParam: 'utm_source=pricereview',   affiliateEnabled: false },
  { id: 'hiraoka',      name: 'Hiraoka',        icon: '📺', rating: 3.9, color: '#D4001A', url: 'https://hiraoka.com.pe',           searchUrl: 'https://hiraoka.com.pe/catalogsearch/result/?q={query}',   affiliateParam: 'utm_source=pricereview',   affiliateEnabled: false },
  { id: 'coolbox',      name: 'CoolBox',        icon: '🎮', rating: 3.8, color: '#00B4D8', url: 'https://www.coolbox.pe',           searchUrl: 'https://www.coolbox.pe/search?q={query}',                  affiliateParam: 'utm_source=pricereview',   affiliateEnabled: false },
  { id: 'amazon',       name: 'Amazon',         icon: '📦', rating: 4.8, color: '#FF9900', url: 'https://www.amazon.com',           searchUrl: 'https://www.amazon.com/s?k={query}',                       affiliateParam: 'tag=pricereview-20',       affiliateEnabled: true },
  { id: 'ebay',         name: 'eBay',           icon: '🏷️', rating: 4.0, color: '#E53238', url: 'https://www.ebay.com',             searchUrl: 'https://www.ebay.com/sch/i.html?_nkw={query}',             affiliateParam: 'mkrid=711-53200-19255-0',  affiliateEnabled: true },
  { id: 'aliexpress',   name: 'AliExpress',     icon: '🌐', rating: 3.5, color: '#FF4747', url: 'https://es.aliexpress.com',        searchUrl: 'https://es.aliexpress.com/wholesale?SearchText={query}',   affiliateParam: 'aff_id=pricereview',       affiliateEnabled: true },
];

/* ---------- CATEGORIES ---------- */
PR.categories = [
  { id: 'electronics', name: 'Electrónica',  icon: '📱', gradient: ['#6366f1','#4f46e5'], count: 6 },
  { id: 'gaming',      name: 'Gaming',       icon: '🎮', gradient: ['#ec4899','#8b5cf6'], count: 4 },
  { id: 'home',        name: 'Hogar',        icon: '🏠', gradient: ['#10b981','#059669'], count: 3 },
  { id: 'fashion',     name: 'Moda',         icon: '👟', gradient: ['#f59e0b','#d97706'], count: 2 },
  { id: 'books',       name: 'Libros',       icon: '📚', gradient: ['#8b5cf6','#6d28d9'], count: 1 },
  { id: 'sports',      name: 'Deportes',     icon: '⚽', gradient: ['#ef4444','#dc2626'], count: 2 },
];

/* ---------- PRODUCTS ---------- */
PR.products = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max 256GB',
    category: 'electronics',
    description: 'El smartphone más avanzado de Apple con chip A18 Pro, pantalla Super Retina XDR de 6.9 pulgadas, sistema de cámaras Pro de 48MP y batería de larga duración.',
    image: { gradient: ['#1a1a2e','#4a148c'], icon: '📱' },
    tags: ['trending', 'bestseller'],
    prices: [
      { storeId: 'amazon',       price: 1149, originalPrice: 1299, inStock: true,  shipping: 0,    deliveryDays: 2,  url: '/product/dp/B0DGHYT392' },
      { storeId: 'ripley',      price: 1199, originalPrice: 1299, inStock: true,  shipping: 0,    deliveryDays: 1,  url: '/site/iphone-16-pro-max/6502300.p' },
      { storeId: 'oechsle',      price: 1179, originalPrice: 1299, inStock: true,  shipping: 0,    deliveryDays: 3,  url: '/ip/iphone-16-pro-max/394857362' },
      { storeId: 'ebay',         price: 1099, originalPrice: 1299, inStock: true,  shipping: 15,   deliveryDays: 5,  url: '/itm/iphone-16-pro-max/284738194' },
      { storeId: 'mercadolibre', price: 1249, originalPrice: 1399, inStock: true,  shipping: 0,    deliveryDays: 4,  url: '/MLM-2038475-iphone-16-pro-max' },
      { storeId: 'hiraoka',       price: 1189, originalPrice: 1299, inStock: false, shipping: 0,    deliveryDays: 3,  url: '/p/iphone-16-pro-max/N82E16875123' },
      { storeId: 'coolbox',       price: 1350, originalPrice: 1450, inStock: true,  shipping: 10,   deliveryDays: 7,  url: '/iphone-16-pro-max-pr-48573.html' },
    ],
    priceHistory: [
      { date: '2025-07', price: 1299 }, { date: '2025-08', price: 1299 }, { date: '2025-09', price: 1279 },
      { date: '2025-10', price: 1249 }, { date: '2025-11', price: 1199 }, { date: '2025-12', price: 1149 },
      { date: '2026-01', price: 1179 }, { date: '2026-02', price: 1159 }, { date: '2026-03', price: 1129 },
      { date: '2026-04', price: 1099 }, { date: '2026-05', price: 1099 },
    ],
  },
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra 512GB',
    category: 'electronics',
    description: 'Potencia con inteligencia artificial Galaxy AI, pantalla Dynamic AMOLED 2X de 6.9", cámara de 200MP y S Pen integrado.',
    image: { gradient: ['#0d1b2a','#1b263b'], icon: '📲' },
    tags: ['trending'],
    prices: [
      { storeId: 'amazon',       price: 1199, originalPrice: 1419, inStock: true,  shipping: 0,   deliveryDays: 2,  url: '/product/dp/B0DSAMPLE1' },
      { storeId: 'ripley',      price: 1249, originalPrice: 1419, inStock: true,  shipping: 0,   deliveryDays: 1,  url: '/site/samsung-s25-ultra/6504200.p' },
      { storeId: 'oechsle',      price: 1219, originalPrice: 1419, inStock: true,  shipping: 0,   deliveryDays: 3,  url: '/ip/samsung-s25-ultra/394857363' },
      { storeId: 'ebay',         price: 1149, originalPrice: 1419, inStock: true,  shipping: 12,  deliveryDays: 4,  url: '/itm/samsung-s25-ultra/284738195' },
      { storeId: 'mercadolibre', price: 1299, originalPrice: 1500, inStock: true,  shipping: 0,   deliveryDays: 3,  url: '/MLM-2038476-samsung-s25-ultra' },
      { storeId: 'aliexpress',   price: 1049, originalPrice: 1419, inStock: true,  shipping: 0,   deliveryDays: 18, url: '/item/samsung-s25-ultra/100205.html' },
    ],
    priceHistory: [
      { date: '2025-07', price: 1419 }, { date: '2025-08', price: 1399 }, { date: '2025-09', price: 1349 },
      { date: '2025-10', price: 1299 }, { date: '2025-11', price: 1249 }, { date: '2025-12', price: 1199 },
      { date: '2026-01', price: 1219 }, { date: '2026-02', price: 1199 }, { date: '2026-03', price: 1179 },
      { date: '2026-04', price: 1149 }, { date: '2026-05', price: 1149 },
    ],
  },
  {
    id: 'macbook-air-m4',
    name: 'MacBook Air M4 15 pulgadas',
    category: 'electronics',
    description: 'Laptop ultradelgada con chip Apple M4, 16GB de RAM, 512GB SSD, pantalla Liquid Retina de 15.3" y hasta 18 horas de batería.',
    image: { gradient: ['#1a1a2e','#2d2d44'], icon: '💻' },
    tags: ['bestseller'],
    prices: [
      { storeId: 'amazon',       price: 1249, originalPrice: 1399, inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE2' },
      { storeId: 'ripley',      price: 1299, originalPrice: 1399, inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/macbook-air-m4/6505100.p' },
      { storeId: 'oechsle',      price: 1279, originalPrice: 1399, inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/macbook-air-m4/394857364' },
      { storeId: 'hiraoka',       price: 1269, originalPrice: 1399, inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/p/macbook-air-m4/N82E16875124' },
      { storeId: 'mercadolibre', price: 1349, originalPrice: 1500, inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038477-macbook-air-m4' },
    ],
    priceHistory: [
      { date: '2025-09', price: 1399 }, { date: '2025-10', price: 1379 }, { date: '2025-11', price: 1349 },
      { date: '2025-12', price: 1299 }, { date: '2026-01', price: 1279 }, { date: '2026-02', price: 1259 },
      { date: '2026-03', price: 1249 }, { date: '2026-04', price: 1249 }, { date: '2026-05', price: 1249 },
    ],
  },
  {
    id: 'airpods-pro-3',
    name: 'Apple AirPods Pro 3',
    category: 'electronics',
    description: 'Auriculares inalámbricos con cancelación activa de ruido, audio adaptativo, chip H3, resistentes al agua y estuche con USB-C.',
    image: { gradient: ['#1e293b','#334155'], icon: '🎧' },
    tags: ['trending'],
    prices: [
      { storeId: 'amazon',       price: 229,  originalPrice: 279,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/product/dp/B0DSAMPLE3' },
      { storeId: 'ripley',      price: 249,  originalPrice: 279,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/airpods-pro-3/6506200.p' },
      { storeId: 'oechsle',      price: 239,  originalPrice: 279,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/ip/airpods-pro-3/394857365' },
      { storeId: 'ebay',         price: 209,  originalPrice: 279,  inStock: true,  shipping: 8,  deliveryDays: 5,  url: '/itm/airpods-pro-3/284738196' },
      { storeId: 'mercadolibre', price: 259,  originalPrice: 299,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/MLM-2038478-airpods-pro-3' },
      { storeId: 'aliexpress',   price: 189,  originalPrice: 279,  inStock: true,  shipping: 0,  deliveryDays: 20, url: '/item/airpods-pro-3/100206.html' },
    ],
    priceHistory: [
      { date: '2025-09', price: 279 }, { date: '2025-10', price: 269 }, { date: '2025-11', price: 249 },
      { date: '2025-12', price: 229 }, { date: '2026-01', price: 239 }, { date: '2026-02', price: 229 },
      { date: '2026-03', price: 219 }, { date: '2026-04', price: 209 }, { date: '2026-05', price: 209 },
    ],
  },
  {
    id: 'sony-wh1000xm6',
    name: 'Sony WH-1000XM6',
    category: 'electronics',
    description: 'Audífonos premium over-ear con cancelación de ruido líder en la industria, 40 horas de batería, LDAC y audio espacial 360.',
    image: { gradient: ['#1a1a2e','#0f172a'], icon: '🎵' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 329,  originalPrice: 399,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE8' },
      { storeId: 'ripley',      price: 349,  originalPrice: 399,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/sony-wh1000xm6/6510200.p' },
      { storeId: 'ebay',         price: 299,  originalPrice: 399,  inStock: true,  shipping: 10, deliveryDays: 5,  url: '/itm/sony-wh1000xm6/284738200' },
      { storeId: 'oechsle',      price: 339,  originalPrice: 399,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/sony-wh1000xm6/394857369' },
      { storeId: 'mercadolibre', price: 369,  originalPrice: 420,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038482-sony-wh1000xm6' },
    ],
    priceHistory: [
      { date: '2025-09', price: 399 }, { date: '2025-10', price: 389 }, { date: '2025-11', price: 369 },
      { date: '2025-12', price: 349 }, { date: '2026-01', price: 339 }, { date: '2026-02', price: 329 },
      { date: '2026-03', price: 319 }, { date: '2026-04', price: 299 }, { date: '2026-05', price: 299 },
    ],
  },
  {
    id: 'apple-watch-ultra-3',
    name: 'Apple Watch Ultra 3',
    category: 'electronics',
    description: 'El reloj más resistente de Apple con GPS de doble frecuencia, pantalla siempre activa de 49mm, hasta 72 horas de batería y sensor de profundidad.',
    image: { gradient: ['#1e3a5f','#0a1628'], icon: '⌚' },
    tags: ['trending'],
    prices: [
      { storeId: 'amazon',       price: 779,  originalPrice: 899,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE12' },
      { storeId: 'ripley',      price: 799,  originalPrice: 899,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/apple-watch-ultra-3/6514200.p' },
      { storeId: 'oechsle',      price: 819,  originalPrice: 899,  inStock: false, shipping: 0,  deliveryDays: 3,  url: '/ip/apple-watch-ultra-3/394857373' },
      { storeId: 'ebay',         price: 749,  originalPrice: 899,  inStock: true,  shipping: 12, deliveryDays: 6,  url: '/itm/apple-watch-ultra-3/284738204' },
      { storeId: 'mercadolibre', price: 859,  originalPrice: 950,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038486-apple-watch-ultra-3' },
    ],
    priceHistory: [
      { date: '2025-10', price: 899 }, { date: '2025-11', price: 879 }, { date: '2025-12', price: 849 },
      { date: '2026-01', price: 829 }, { date: '2026-02', price: 799 }, { date: '2026-03', price: 779 },
      { date: '2026-04', price: 759 }, { date: '2026-05', price: 749 },
    ],
  },
  {
    id: 'ps5-pro',
    name: 'PlayStation 5 Pro',
    category: 'gaming',
    description: 'Consola de nueva generación con GPU mejorada, 2TB SSD, ray tracing avanzado y resolución hasta 8K. Incluye DualSense.',
    image: { gradient: ['#0a0a2e','#1a0a3e'], icon: '🎮' },
    tags: ['trending', 'bestseller'],
    prices: [
      { storeId: 'amazon',       price: 699,  originalPrice: 799,  inStock: true,  shipping: 0,   deliveryDays: 2,  url: '/product/dp/B0DSAMPLE4' },
      { storeId: 'ripley',      price: 699,  originalPrice: 799,  inStock: true,  shipping: 0,   deliveryDays: 1,  url: '/site/ps5-pro/6507100.p' },
      { storeId: 'oechsle',      price: 699,  originalPrice: 799,  inStock: false, shipping: 0,   deliveryDays: 3,  url: '/ip/ps5-pro/394857366' },
      { storeId: 'ebay',         price: 679,  originalPrice: 799,  inStock: true,  shipping: 15,  deliveryDays: 5,  url: '/itm/ps5-pro/284738197' },
      { storeId: 'mercadolibre', price: 759,  originalPrice: 850,  inStock: true,  shipping: 0,   deliveryDays: 4,  url: '/MLM-2038479-ps5-pro' },
      { storeId: 'coolbox',       price: 799,  originalPrice: 899,  inStock: true,  shipping: 10,  deliveryDays: 7,  url: '/ps5-pro-pr-48574.html' },
    ],
    priceHistory: [
      { date: '2025-07', price: 799 }, { date: '2025-08', price: 799 }, { date: '2025-09', price: 779 },
      { date: '2025-10', price: 749 }, { date: '2025-11', price: 699 }, { date: '2025-12', price: 699 },
      { date: '2026-01', price: 699 }, { date: '2026-02', price: 689 }, { date: '2026-03', price: 679 },
      { date: '2026-04', price: 679 }, { date: '2026-05', price: 679 },
    ],
  },
  {
    id: 'nintendo-switch-2',
    name: 'Nintendo Switch 2',
    category: 'gaming',
    description: 'La nueva generación de Nintendo con pantalla OLED de 7.9", soporte 4K en modo dock, Joy-Con magnéticos y retrocompatibilidad total.',
    image: { gradient: ['#1a0000','#3d0a0a'], icon: '🕹️' },
    tags: ['trending'],
    prices: [
      { storeId: 'amazon',       price: 399,  originalPrice: 449,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE5' },
      { storeId: 'ripley',      price: 399,  originalPrice: 449,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/nintendo-switch-2/6508100.p' },
      { storeId: 'oechsle',      price: 399,  originalPrice: 449,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/nintendo-switch-2/394857367' },
      { storeId: 'ebay',         price: 379,  originalPrice: 449,  inStock: true,  shipping: 10, deliveryDays: 5,  url: '/itm/nintendo-switch-2/284738198' },
      { storeId: 'mercadolibre', price: 429,  originalPrice: 499,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038480-nintendo-switch-2' },
    ],
    priceHistory: [
      { date: '2025-10', price: 449 }, { date: '2025-11', price: 449 }, { date: '2025-12', price: 429 },
      { date: '2026-01', price: 419 }, { date: '2026-02', price: 399 }, { date: '2026-03', price: 399 },
      { date: '2026-04', price: 389 }, { date: '2026-05', price: 379 },
    ],
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X 2TB',
    category: 'gaming',
    description: 'Consola Xbox más potente con 2TB de almacenamiento, procesador a 3.8GHz, 4K a 120fps y acceso a Game Pass Ultimate.',
    image: { gradient: ['#0a2e0a','#0d3b0d'], icon: '🟢' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 499,  originalPrice: 599,  inStock: true,  shipping: 0,   deliveryDays: 2,  url: '/product/dp/B0DSAMPLE11' },
      { storeId: 'ripley',      price: 499,  originalPrice: 599,  inStock: true,  shipping: 0,   deliveryDays: 1,  url: '/site/xbox-series-x/6513200.p' },
      { storeId: 'oechsle',      price: 489,  originalPrice: 599,  inStock: true,  shipping: 0,   deliveryDays: 3,  url: '/ip/xbox-series-x/394857372' },
      { storeId: 'ebay',         price: 459,  originalPrice: 599,  inStock: true,  shipping: 12,  deliveryDays: 5,  url: '/itm/xbox-series-x/284738203' },
      { storeId: 'mercadolibre', price: 549,  originalPrice: 650,  inStock: true,  shipping: 0,   deliveryDays: 4,  url: '/MLM-2038485-xbox-series-x' },
    ],
    priceHistory: [
      { date: '2025-08', price: 599 }, { date: '2025-09', price: 579 }, { date: '2025-10', price: 549 },
      { date: '2025-11', price: 499 }, { date: '2025-12', price: 499 }, { date: '2026-01', price: 489 },
      { date: '2026-02', price: 479 }, { date: '2026-03', price: 469 }, { date: '2026-04', price: 459 },
      { date: '2026-05', price: 459 },
    ],
  },
  {
    id: 'monitor-lg-27-4k',
    name: 'Monitor Gaming LG 27" 4K 144Hz',
    category: 'gaming',
    description: 'Monitor IPS UHD 4K de 27 pulgadas con 144Hz, 1ms GtG, compatible G-Sync y FreeSync, HDR600 y USB-C con carga de 96W.',
    image: { gradient: ['#1a0a2e','#2d1b4e'], icon: '🖥️' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 449,  originalPrice: 549,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/product/dp/B0DSAMPLE9' },
      { storeId: 'ripley',      price: 479,  originalPrice: 549,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/lg-27-4k/6511200.p' },
      { storeId: 'hiraoka',       price: 429,  originalPrice: 549,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/p/lg-27-4k/N82E16875126' },
      { storeId: 'ebay',         price: 399,  originalPrice: 549,  inStock: true,  shipping: 15, deliveryDays: 5,  url: '/itm/lg-27-4k/284738201' },
      { storeId: 'oechsle',      price: 459,  originalPrice: 549,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/lg-27-4k/394857370' },
    ],
    priceHistory: [
      { date: '2025-08', price: 549 }, { date: '2025-09', price: 529 }, { date: '2025-10', price: 499 },
      { date: '2025-11', price: 469 }, { date: '2025-12', price: 449 }, { date: '2026-01', price: 439 },
      { date: '2026-02', price: 429 }, { date: '2026-03', price: 419 }, { date: '2026-04', price: 399 },
      { date: '2026-05', price: 399 },
    ],
  },
  {
    id: 'samsung-tv-55-qled',
    name: 'Smart TV Samsung 55" QLED 4K',
    category: 'electronics',
    description: 'Televisor QLED con resolución 4K, procesador Neural Quantum, Tizen OS, Dolby Atmos, y diseño ultrafino AirSlim.',
    image: { gradient: ['#0a1628','#1a2a4a'], icon: '📺' },
    tags: ['bestseller'],
    prices: [
      { storeId: 'amazon',       price: 649,  originalPrice: 899,  inStock: true,  shipping: 0,   deliveryDays: 3,  url: '/product/dp/B0DSAMPLE6' },
      { storeId: 'ripley',      price: 699,  originalPrice: 899,  inStock: true,  shipping: 0,   deliveryDays: 2,  url: '/site/samsung-55-qled/6509100.p' },
      { storeId: 'oechsle',      price: 679,  originalPrice: 899,  inStock: true,  shipping: 0,   deliveryDays: 4,  url: '/ip/samsung-55-qled/394857368' },
      { storeId: 'mercadolibre', price: 729,  originalPrice: 950,  inStock: true,  shipping: 0,   deliveryDays: 5,  url: '/MLM-2038481-samsung-55-qled' },
      { storeId: 'coolbox',       price: 799,  originalPrice: 999,  inStock: true,  shipping: 30,  deliveryDays: 8,  url: '/samsung-55-qled-pr-48575.html' },
      { storeId: 'falabella',    price: 719,  originalPrice: 899,  inStock: true,  shipping: 0,   deliveryDays: 5,  url: '/falabella/samsung-55-qled/20384' },
    ],
    priceHistory: [
      { date: '2025-07', price: 899 }, { date: '2025-08', price: 879 }, { date: '2025-09', price: 849 },
      { date: '2025-10', price: 799 }, { date: '2025-11', price: 699 }, { date: '2025-12', price: 679 },
      { date: '2026-01', price: 669 }, { date: '2026-02', price: 659 }, { date: '2026-03', price: 649 },
      { date: '2026-04', price: 649 }, { date: '2026-05', price: 649 },
    ],
  },
  {
    id: 'roborock-s8-pro',
    name: 'Robot Aspirador Roborock S8 Pro Ultra',
    category: 'home',
    description: 'Robot aspirador y trapeador con estación de autovaciado, lavado y secado de mopa, navegación LiDAR y succión de 6000Pa.',
    image: { gradient: ['#0a2e1a','#14532d'], icon: '🤖' },
    tags: ['bestseller'],
    prices: [
      { storeId: 'amazon',       price: 549,  originalPrice: 699,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE7' },
      { storeId: 'ripley',      price: 599,  originalPrice: 699,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/site/roborock-s8-pro/6510100.p' },
      { storeId: 'oechsle',      price: 579,  originalPrice: 699,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/roborock-s8-pro/394857369' },
      { storeId: 'ebay',         price: 519,  originalPrice: 699,  inStock: true,  shipping: 12, deliveryDays: 6,  url: '/itm/roborock-s8-pro/284738199' },
      { storeId: 'aliexpress',   price: 479,  originalPrice: 699,  inStock: true,  shipping: 0,  deliveryDays: 15, url: '/item/roborock-s8-pro/100207.html' },
    ],
    priceHistory: [
      { date: '2025-07', price: 699 }, { date: '2025-08', price: 679 }, { date: '2025-09', price: 649 },
      { date: '2025-10', price: 599 }, { date: '2025-11', price: 549 }, { date: '2025-12', price: 539 },
      { date: '2026-01', price: 529 }, { date: '2026-02', price: 519 }, { date: '2026-03', price: 499 },
      { date: '2026-04', price: 479 }, { date: '2026-05', price: 479 },
    ],
  },
  {
    id: 'nespresso-vertuo-next',
    name: 'Cafetera Nespresso Vertuo Next',
    category: 'home',
    description: 'Máquina de café con tecnología Centrifusion, 5 tamaños de taza, calentamiento en 30s, sistema de cápsulas inteligente con lectura de código de barras.',
    image: { gradient: ['#2e1a0a','#4a2e1a'], icon: '☕' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 149,  originalPrice: 219,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE10' },
      { storeId: 'ripley',      price: 169,  originalPrice: 219,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/site/nespresso-vertuo/6512200.p' },
      { storeId: 'oechsle',      price: 159,  originalPrice: 219,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/nespresso-vertuo/394857371' },
      { storeId: 'mercadolibre', price: 179,  originalPrice: 250,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038484-nespresso-vertuo' },
      { storeId: 'coolbox',       price: 199,  originalPrice: 249,  inStock: true,  shipping: 10, deliveryDays: 6,  url: '/nespresso-vertuo-pr-48577.html' },
      { storeId: 'falabella',    price: 174,  originalPrice: 219,  inStock: true,  shipping: 0,  deliveryDays: 5,  url: '/falabella/nespresso-vertuo/20386' },
    ],
    priceHistory: [
      { date: '2025-08', price: 219 }, { date: '2025-09', price: 199 }, { date: '2025-10', price: 189 },
      { date: '2025-11', price: 169 }, { date: '2025-12', price: 149 }, { date: '2026-01', price: 159 },
      { date: '2026-02', price: 149 }, { date: '2026-03', price: 149 }, { date: '2026-04', price: 149 },
      { date: '2026-05', price: 149 },
    ],
  },
  {
    id: 'dyson-v15-detect',
    name: 'Dyson V15 Detect Absolute',
    category: 'home',
    description: 'Aspiradora inalámbrica con sensor láser para polvo invisible, pantalla LCD con conteo de partículas y hasta 60 min de autonomía.',
    image: { gradient: ['#2e0a2e','#4a1a4a'], icon: '🧹' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 599,  originalPrice: 749,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE13' },
      { storeId: 'ripley',      price: 649,  originalPrice: 749,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/site/dyson-v15/6515200.p' },
      { storeId: 'ebay',         price: 549,  originalPrice: 749,  inStock: true,  shipping: 15, deliveryDays: 5,  url: '/itm/dyson-v15/284738205' },
      { storeId: 'oechsle',      price: 629,  originalPrice: 749,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/dyson-v15/394857374' },
    ],
    priceHistory: [
      { date: '2025-08', price: 749 }, { date: '2025-09', price: 729 }, { date: '2025-10', price: 699 },
      { date: '2025-11', price: 649 }, { date: '2025-12', price: 629 }, { date: '2026-01', price: 619 },
      { date: '2026-02', price: 599 }, { date: '2026-03', price: 579 }, { date: '2026-04', price: 549 },
      { date: '2026-05', price: 549 },
    ],
  },
  {
    id: 'nike-air-max-270',
    name: 'Nike Air Max 270',
    category: 'fashion',
    description: 'Zapatillas con la unidad Air más grande de Nike, parte superior de malla transpirable, diseño lifestyle inspirado en el running.',
    image: { gradient: ['#2e1a0a','#4a2e14'], icon: '👟' },
    tags: ['bestseller'],
    prices: [
      { storeId: 'amazon',       price: 119,  originalPrice: 160,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/product/dp/B0DSAMPLE14' },
      { storeId: 'ebay',         price: 99,   originalPrice: 160,  inStock: true,  shipping: 8,  deliveryDays: 5,  url: '/itm/nike-air-max-270/284738206' },
      { storeId: 'mercadolibre', price: 129,  originalPrice: 175,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038487-nike-air-max-270' },
      { storeId: 'falabella',    price: 135,  originalPrice: 160,  inStock: true,  shipping: 0,  deliveryDays: 5,  url: '/falabella/nike-air-max-270/20387' },
      { storeId: 'coolbox',       price: 145,  originalPrice: 175,  inStock: true,  shipping: 10, deliveryDays: 6,  url: '/nike-air-max-270-pr-48578.html' },
    ],
    priceHistory: [
      { date: '2025-08', price: 160 }, { date: '2025-09', price: 150 }, { date: '2025-10', price: 139 },
      { date: '2025-11', price: 119 }, { date: '2025-12', price: 119 }, { date: '2026-01', price: 115 },
      { date: '2026-02', price: 109 }, { date: '2026-03', price: 105 }, { date: '2026-04', price: 99 },
      { date: '2026-05', price: 99 },
    ],
  },
  {
    id: 'rayban-wayfarer',
    name: 'Ray-Ban Wayfarer Classic',
    category: 'fashion',
    description: 'Lentes de sol icónicas con montura acetato, lentes de cristal polarizado, protección UV 100% y diseño atemporal desde 1956.',
    image: { gradient: ['#1a0a0a','#3d1a1a'], icon: '🕶️' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 139,  originalPrice: 189,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/product/dp/B0DSAMPLE15' },
      { storeId: 'ebay',         price: 119,  originalPrice: 189,  inStock: true,  shipping: 5,  deliveryDays: 5,  url: '/itm/rayban-wayfarer/284738207' },
      { storeId: 'mercadolibre', price: 149,  originalPrice: 200,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038488-rayban-wayfarer' },
      { storeId: 'oechsle',      price: 145,  originalPrice: 189,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/rayban-wayfarer/394857375' },
    ],
    priceHistory: [
      { date: '2025-08', price: 189 }, { date: '2025-09', price: 179 }, { date: '2025-10', price: 169 },
      { date: '2025-11', price: 149 }, { date: '2025-12', price: 139 }, { date: '2026-01', price: 139 },
      { date: '2026-02', price: 129 }, { date: '2026-03', price: 125 }, { date: '2026-04', price: 119 },
      { date: '2026-05', price: 119 },
    ],
  },
  {
    id: 'kindle-paperwhite-2025',
    name: 'Kindle Paperwhite (2025)',
    category: 'books',
    description: 'E-reader con pantalla de 7", iluminación ajustable, resistente al agua IPX8, 32GB de almacenamiento y semanas de batería.',
    image: { gradient: ['#1a1a2e','#2a2a4e'], icon: '📖' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 129,  originalPrice: 159,  inStock: true,  shipping: 0,  deliveryDays: 1,  url: '/product/dp/B0DSAMPLE16' },
      { storeId: 'ripley',      price: 139,  originalPrice: 159,  inStock: true,  shipping: 0,  deliveryDays: 2,  url: '/site/kindle-paperwhite/6516200.p' },
      { storeId: 'oechsle',      price: 135,  originalPrice: 159,  inStock: true,  shipping: 0,  deliveryDays: 3,  url: '/ip/kindle-paperwhite/394857376' },
      { storeId: 'ebay',         price: 115,  originalPrice: 159,  inStock: true,  shipping: 6,  deliveryDays: 5,  url: '/itm/kindle-paperwhite/284738208' },
      { storeId: 'mercadolibre', price: 145,  originalPrice: 175,  inStock: true,  shipping: 0,  deliveryDays: 4,  url: '/MLM-2038489-kindle-paperwhite' },
    ],
    priceHistory: [
      { date: '2025-09', price: 159 }, { date: '2025-10', price: 149 }, { date: '2025-11', price: 129 },
      { date: '2025-12', price: 119 }, { date: '2026-01', price: 129 }, { date: '2026-02', price: 125 },
      { date: '2026-03', price: 119 }, { date: '2026-04', price: 115 }, { date: '2026-05', price: 115 },
    ],
  },
  {
    id: 'peloton-bike-plus',
    name: 'Peloton Bike+',
    category: 'sports',
    description: 'Bicicleta estática premium con pantalla giratoria de 24", auto-resistencia, Apple GymKit, sonido envolvente y miles de clases en vivo.',
    image: { gradient: ['#2e0a0a','#4a1414'], icon: '🚴' },
    tags: [],
    prices: [
      { storeId: 'amazon',       price: 1999, originalPrice: 2495, inStock: true,  shipping: 0,   deliveryDays: 7,  url: '/product/dp/B0DSAMPLE17' },
      { storeId: 'ripley',      price: 2195, originalPrice: 2495, inStock: true,  shipping: 0,   deliveryDays: 5,  url: '/site/peloton-bike-plus/6517200.p' },
      { storeId: 'ebay',         price: 1799, originalPrice: 2495, inStock: true,  shipping: 50,  deliveryDays: 8,  url: '/itm/peloton-bike-plus/284738209' },
      { storeId: 'oechsle',      price: 2095, originalPrice: 2495, inStock: false, shipping: 0,   deliveryDays: 7,  url: '/ip/peloton-bike-plus/394857377' },
    ],
    priceHistory: [
      { date: '2025-08', price: 2495 }, { date: '2025-09', price: 2395 }, { date: '2025-10', price: 2295 },
      { date: '2025-11', price: 2095 }, { date: '2025-12', price: 1999 }, { date: '2026-01', price: 1999 },
      { date: '2026-02', price: 1899 }, { date: '2026-03', price: 1849 }, { date: '2026-04', price: 1799 },
      { date: '2026-05', price: 1799 },
    ],
  },
];

/* ==========================================
   CURRENCY DETECTION & FORMATTING
   ========================================== */
PR.currency = { code: 'USD', symbol: '$', rate: 1, locale: 'en-US', country: 'us' };

PR._currencyMap = {
  US: { code: 'USD', symbol: '$',   locale: 'en-US' },
  MX: { code: 'MXN', symbol: 'MX$', locale: 'es-MX' },
  CO: { code: 'COP', symbol: '$',   locale: 'es-CO' },
  AR: { code: 'ARS', symbol: '$',   locale: 'es-AR' },
  CL: { code: 'CLP', symbol: '$',   locale: 'es-CL' },
  PE: { code: 'PEN', symbol: 'S/',  locale: 'es-PE' },
  VE: { code: 'VES', symbol: 'Bs.', locale: 'es-VE' },
  EC: { code: 'USD', symbol: '$',   locale: 'es-EC' },
  ES: { code: 'EUR', symbol: '€',   locale: 'es-ES' },
  FR: { code: 'EUR', symbol: '€',   locale: 'fr-FR' },
  DE: { code: 'EUR', symbol: '€',   locale: 'de-DE' },
  GB: { code: 'GBP', symbol: '£',   locale: 'en-GB' },
  BR: { code: 'BRL', symbol: 'R$',  locale: 'pt-BR' },
  CA: { code: 'CAD', symbol: 'CA$', locale: 'en-CA' },
  JP: { code: 'JPY', symbol: '¥',   locale: 'ja-JP' },
};

PR._tzToCountry = {
  'America/Mexico_City': 'MX', 'America/Monterrey': 'MX', 'America/Merida': 'MX',
  'America/Cancun': 'MX', 'America/Chihuahua': 'MX', 'America/Mazatlan': 'MX',
  'America/Tijuana': 'MX', 'America/Hermosillo': 'MX',
  'America/Bogota': 'CO',
  'America/Argentina/Buenos_Aires': 'AR', 'America/Buenos_Aires': 'AR',
  'America/Guayaquil': 'EC',
  'America/Santiago': 'CL',
  'America/Lima': 'PE',
  'America/Caracas': 'VE',
  'America/Sao_Paulo': 'BR', 'America/Fortaleza': 'BR',
  'Europe/Madrid': 'ES', 'Europe/Paris': 'FR', 'Europe/Berlin': 'DE',
  'Europe/London': 'GB',
  'America/Toronto': 'CA', 'America/Vancouver': 'CA',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US',
  'America/Los_Angeles': 'US', 'America/Phoenix': 'US',
  'Asia/Tokyo': 'JP',
};

/** Regional search URLs for stores with multiple country domains */
PR._regionUrls = {
  'mercadolibre': {
    pe: 'https://listado.mercadolibre.com.pe/{query}',
    mx: 'https://listado.mercadolibre.com.mx/{query}',
    co: 'https://listado.mercadolibre.com.co/{query}',
    ar: 'https://listado.mercadolibre.com.ar/{query}',
    cl: 'https://listado.mercadolibre.cl/{query}',
    ve: 'https://listado.mercadolibre.com.ve/{query}',
    ec: 'https://listado.mercadolibre.com.ec/{query}',
  },
  'falabella': {
    pe: 'https://www.falabella.com.pe/search?Ntt={query}',
    cl: 'https://www.falabella.com/falabella-cl/search?Ntt={query}',
    co: 'https://www.falabella.com.co/falabella-co/search?Ntt={query}',
  },
  'ripley': {
    pe: 'https://simple.ripley.com.pe/search?q={query}',
    cl: 'https://simple.ripley.cl/search?q={query}',
  },
};

/** Detect user country and currency, then fetch exchange rate */
PR.initCurrency = function(callback) {
  var country = '';

  // 1. FIRST: detect from timezone (most reliable for physical location)
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    country = PR._tzToCountry[tz] || '';
  } catch(e) {}

  // 2. FALLBACK: try navigator.language (e.g. "es-PE")
  if (!country) {
    var lang = navigator.language || navigator.userLanguage || 'en-US';
    var parts = lang.split('-');
    country = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'US';
    if (!PR._currencyMap[country]) country = 'US';
  }

  var info = PR._currencyMap[country] || PR._currencyMap['US'];
  PR.currency.code = info.code;
  PR.currency.symbol = info.symbol;
  PR.currency.locale = info.locale;
  PR.currency.country = country.toLowerCase();

  // 3. If not USD, fetch live exchange rate
  if (PR.currency.code !== 'USD') {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.rates && data.rates[PR.currency.code]) {
          PR.currency.rate = data.rates[PR.currency.code];
        }
        if (callback) callback();
      })
      .catch(function() {
        var fb = { MXN:17.2, EUR:0.92, GBP:0.79, COP:4350, ARS:1050, CLP:950, PEN:3.75, BRL:5.2, CAD:1.36, JPY:155, VES:40 };
        PR.currency.rate = fb[PR.currency.code] || 1;
        if (callback) callback();
      });
  } else {
    if (callback) callback();
  }
};

/* ==========================================
   HELPER FUNCTIONS
   ========================================== */

/** Get a store by its ID */
PR.getStore = function(storeId) {
  return PR.stores.find(s => s.id === storeId);
};

/** Get a product by its ID */
PR.getProduct = function(productId) {
  return PR.products.find(p => p.id === productId);
};

/** Get category object by ID */
PR.getCategory = function(catId) {
  return PR.categories.find(c => c.id === catId);
};

/** Get the best (lowest) price for a product (in-stock only) */
PR.getBestPrice = function(product) {
  const inStock = product.prices.filter(p => p.inStock);
  if (!inStock.length) return null;
  return inStock.reduce((best, p) => {
    const total = p.price + (p.shipping || 0);
    const bestTotal = best.price + (best.shipping || 0);
    return total < bestTotal ? p : best;
  });
};

/** Get the most reliable store option for a product (in-stock, highest rated) */
PR.getMostReliable = function(product) {
  const inStock = product.prices.filter(p => p.inStock);
  if (!inStock.length) return null;
  return inStock.reduce((best, p) => {
    const store = PR.getStore(p.storeId) || { rating: p.ratingOriginal || 4.0 };
    const bestStore = PR.getStore(best.storeId) || { rating: best.ratingOriginal || 4.0 };
    return store.rating > bestStore.rating ? p : best;
  });
};

/** Get price range string for a product */
PR.getPriceRange = function(product) {
  const prices = product.prices.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max };
};

/** Get max discount percentage for a product */
PR.getMaxDiscount = function(product) {
  let maxDiscount = 0;
  product.prices.forEach(p => {
    if (p.originalPrice > p.price) {
      const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
      if (discount > maxDiscount) maxDiscount = discount;
    }
  });
  return maxDiscount;
};

/** Format price — converts from USD to user's local currency */
PR.formatPrice = function(amount) {
  var converted = Math.round(amount * PR.currency.rate);
  try {
    return new Intl.NumberFormat(PR.currency.locale, {
      style: 'currency', currency: PR.currency.code,
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(converted);
  } catch(e) {
    return PR.currency.symbol + ' ' + converted.toLocaleString();
  }
};

/** Format a price that's already in local currency (for API results) */
PR.formatLocalPrice = function(amount) {
  try {
    return new Intl.NumberFormat(PR.currency.locale, {
      style: 'currency', currency: PR.currency.code,
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(Math.round(amount));
  } catch(e) {
    return PR.currency.symbol + ' ' + Math.round(amount).toLocaleString();
  }
};

/** Generate rating stars HTML */
PR.renderStars = function(rating, maxStars) {
  maxStars = maxStars || 5;
  let html = '<div class="rating-stars">';
  for (let i = 1; i <= maxStars; i++) {
    html += '<span class="rating-star ' + (i <= Math.round(rating) ? 'filled' : '') + '">★</span>';
  }
  html += '</div>';
  return html;
};

/* ==========================================
   STORE SEARCH URL MAPPING (for API results)
   ========================================== */
PR._storeSearchUrls = {
  // Peruvian stores
  'mercado libre':     'https://listado.mercadolibre.com.pe/{query}',
  'mercadolibre':      'https://listado.mercadolibre.com.pe/{query}',
  'falabella':         'https://www.falabella.com.pe/search?Ntt={query}',
  'saga falabella':    'https://www.falabella.com.pe/search?Ntt={query}',
  'ripley':            'https://simple.ripley.com.pe/search?q={query}',
  'oechsle':           'https://www.oechsle.pe/search?q={query}',
  'plazavea':          'https://www.plazavea.com.pe/search?_query={query}',
  'plaza vea':         'https://www.plazavea.com.pe/search?_query={query}',
  'hiraoka':           'https://hiraoka.com.pe/catalogsearch/result/?q={query}',
  'coolbox':           'https://www.coolbox.pe/search?q={query}',
  'promart':           'https://www.promart.pe/busqueda?q={query}',
  'sodimac':           'https://www.sodimac.com.pe/search?q={query}',
  // International
  'amazon':            'https://www.amazon.com/s?k={query}',
  'amazon.com':        'https://www.amazon.com/s?k={query}',
  'ebay':              'https://www.ebay.com/sch/i.html?_nkw={query}',
  'ebay.com':          'https://www.ebay.com/sch/i.html?_nkw={query}',
  'aliexpress':        'https://es.aliexpress.com/wholesale?SearchText={query}',
  'walmart':           'https://www.walmart.com/search?q={query}',
  'walmart.com':       'https://www.walmart.com/search?q={query}',
  'best buy':          'https://www.bestbuy.com/site/searchpage.jsp?st={query}',
  'bestbuy.com':       'https://www.bestbuy.com/site/searchpage.jsp?st={query}',
  'target':            'https://www.target.com/s?searchTerm={query}',
  'target.com':        'https://www.target.com/s?searchTerm={query}',
  'newegg':            'https://www.newegg.com/p/pl?d={query}',
  'newegg.com':        'https://www.newegg.com/p/pl?d={query}',
};

/**
 * Get a direct store search URL for an API result.
 * Matches SerpAPI "source" names to known store search pages.
 */
PR.getStoreSearchUrl = function(storeName, productTitle) {
  var name = (storeName || '').toLowerCase().trim();
  var encoded = encodeURIComponent(productTitle);

  // Exact match
  if (PR._storeSearchUrls[name]) {
    return PR._storeSearchUrls[name].replace('{query}', encoded);
  }

  // Partial match (e.g. "Amazon.com" contains "amazon")
  var keys = Object.keys(PR._storeSearchUrls);
  for (var i = 0; i < keys.length; i++) {
    if (name.indexOf(keys[i]) !== -1 || keys[i].indexOf(name) !== -1) {
      return PR._storeSearchUrls[keys[i]].replace('{query}', encoded);
    }
  }

  // Last resort: Google search targeting the store
  return 'https://www.google.com/search?q=' + encodeURIComponent(productTitle + ' ' + storeName + ' comprar');
};

/**
 * Generate affiliate link for a store + product
 * Uses real store search URLs so links always resolve to actual pages.
 * When you get real affiliate network IDs, just update affiliateParam in the stores array.
 */
PR.generateAffiliateLink = function(storeId, productEntry, productName) {
  const store = PR.getStore(storeId);
  if (!store) return '#';

  // Use the product name to build a real search URL on the store
  // Find product name: passed directly, or look it up from the product catalog
  var query = productName || '';
  if (!query) {
    // Try to find the product that owns this price entry
    var ownerProduct = PR.products.find(function(p) {
      return p.prices.some(function(pe) { return pe === productEntry; });
    });
    if (ownerProduct) query = ownerProduct.name;
  }

  // Build the search URL (use regional URL if available for this country)
  var encodedQuery = encodeURIComponent(query);
  var cc = PR.currency.country;
  var searchUrl = (PR._regionUrls[storeId] && PR._regionUrls[storeId][cc])
    ? PR._regionUrls[storeId][cc]
    : (store.searchUrl || store.url + '/search?q={query}');
  var baseUrl = searchUrl.replace('{query}', encodedQuery);

  // Append affiliate parameter if enabled
  if (store.affiliateEnabled && store.affiliateParam) {
    var separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
    baseUrl += separator + store.affiliateParam;
  }

  // Add tracking parameters
  baseUrl += (baseUrl.indexOf('?') !== -1 ? '&' : '?') + 'utm_source=pricereviewer&utm_medium=referral';

  return baseUrl;
};

/**
 * Search products by query string
 * Returns matched products sorted by relevance
 */
PR.searchProducts = function(query) {
  if (!query || query.trim() === '') return PR.products;
  var q = query.toLowerCase().trim();
  var words = q.split(/\s+/);

  var scored = PR.products.map(function(product) {
    var name = product.name.toLowerCase();
    var desc = product.description.toLowerCase();
    var cat  = (PR.getCategory(product.category) || {}).name || '';
    cat = cat.toLowerCase();
    var score = 0;

    // Exact name match
    if (name.indexOf(q) !== -1) score += 100;
    // Category match
    if (cat.indexOf(q) !== -1) score += 50;
    // Word matches
    words.forEach(function(w) {
      if (name.indexOf(w) !== -1)  score += 30;
      if (desc.indexOf(w) !== -1)  score += 10;
      if (cat.indexOf(w) !== -1)   score += 20;
    });
    // Tag matches
    product.tags.forEach(function(tag) {
      if (tag.indexOf(q) !== -1) score += 15;
    });

    return { product: product, score: score };
  });

  return scored
    .filter(function(s) { return s.score > 0; })
    .sort(function(a, b) { return b.score - a.score; })
    .map(function(s) { return s.product; });
};

/**
 * Filter products by criteria
 * @param {Array} products - Products to filter
 * @param {Object} filters - { category, minPrice, maxPrice, stores, minRating, inStockOnly }
 */
PR.filterProducts = function(products, filters) {
  return products.filter(function(product) {
    // Category filter
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    var range = PR.getPriceRange(product);
    if (filters.minPrice && range.min < filters.minPrice) return false;
    if (filters.maxPrice && range.max > filters.maxPrice) return false;

    // Store filter
    if (filters.stores && filters.stores.length > 0) {
      var hasStore = product.prices.some(function(p) {
        return filters.stores.indexOf(p.storeId) !== -1;
      });
      if (!hasStore) return false;
    }

    // In-stock filter
    if (filters.inStockOnly) {
      var anyInStock = product.prices.some(function(p) { return p.inStock; });
      if (!anyInStock) return false;
    }

    return true;
  });
};

/**
 * Sort products by criteria
 * @param {Array} products
 * @param {string} sortBy - 'price-asc', 'price-desc', 'discount', 'relevance', 'name'
 */
PR.sortProducts = function(products, sortBy) {
  var sorted = products.slice();
  switch (sortBy) {
    case 'price-asc':
      sorted.sort(function(a, b) { return PR.getPriceRange(a).min - PR.getPriceRange(b).min; });
      break;
    case 'price-desc':
      sorted.sort(function(a, b) { return PR.getPriceRange(b).min - PR.getPriceRange(a).min; });
      break;
    case 'discount':
      sorted.sort(function(a, b) { return PR.getMaxDiscount(b) - PR.getMaxDiscount(a); });
      break;
    case 'name':
      sorted.sort(function(a, b) { return a.name.localeCompare(b.name); });
      break;
    case 'relevance':
    default:
      // Keep original order (already sorted by relevance from search)
      break;
  }
  return sorted;
};

/* Export namespace */
window.PR = PR;
