/**
 * PriceReviewer — Ads & Monetization Module
 * ==========================================
 *
 * SETUP:
 * 1. Create a Google AdSense account at https://www.google.com/adsense
 * 2. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 3. Replace the value below in ADS_CONFIG.adsensePublisherId
 * 4. Create ad units in your AdSense dashboard and put the slot IDs below
 *
 * This module handles:
 * - Google AdSense auto ad insertion
 * - Fallback affiliate banners when AdSense is blocked
 * - Affiliate link click tracking
 * - Ad-blocker detection with friendly message
 */

(function () {
  'use strict';

  /* ===========================================
     CONFIGURATION — Edit these values
     =========================================== */
  var ADS_CONFIG = {
    // Google AdSense Publisher ID (get from https://www.google.com/adsense)
    // Replace with your real ID once approved
    adsensePublisherId: 'ca-pub-7756073684592673',

    // Ad Unit Slot IDs (create these in your AdSense dashboard)
    // Each ad placement gets its own slot for better tracking
    slots: {
      bannerTop:    '1234567890',  // 728x90 leaderboard
      bannerBottom: '1234567891',  // 728x90 leaderboard
      sidebar:      '1234567892',  // 300x250 medium rectangle
      infeed:       '1234567893',  // in-feed native ad
      leaderboard:  '1234567894',  // 728x90 mid-page
    },

    // Set to true once your AdSense account is approved
    adsenseEnabled: true,

    // Affiliate fallback banners (shown when AdSense is not active)
    // Replace URLs with your real affiliate links
    affiliateBanners: [
      {
        img: '',
        title: '🔥 Las mejores ofertas en tecnología',
        subtitle: 'Encuentra precios increíbles en Mercado Libre',
        link: 'https://www.mercadolibre.com.pe',
        color: '#FFE600',
        store: 'Mercado Libre'
      },
      {
        img: '',
        title: '💻 Laptops y PCs desde S/ 999',
        subtitle: 'Grandes descuentos en Falabella',
        link: 'https://www.falabella.com.pe/falabella-pe/category/cat40712/Computadoras',
        color: '#AAD500',
        store: 'Falabella'
      },
      {
        img: '',
        title: '🎮 Gaming al mejor precio',
        subtitle: 'Consolas, accesorios y más en Ripley',
        link: 'https://simple.ripley.com.pe/tecnologia/gamer',
        color: '#8B1A8E',
        store: 'Ripley'
      },
      {
        img: '',
        title: '📱 Smartphones desde S/ 399',
        subtitle: 'Celulares con envío gratis en Oechsle',
        link: 'https://www.oechsle.pe/tecnologia/celulares',
        color: '#E31837',
        store: 'Oechsle'
      },
      {
        img: '',
        title: '🏠 Electrohogar en oferta',
        subtitle: 'Precios especiales en Hiraoka',
        link: 'https://hiraoka.com.pe/electrohogar',
        color: '#D4001A',
        store: 'Hiraoka'
      },
      {
        img: '',
        title: '🎧 Audífonos y accesorios',
        subtitle: 'Lo último en tecnología en CoolBox',
        link: 'https://www.coolbox.pe/audifonos',
        color: '#00B4D8',
        store: 'CoolBox'
      }
    ]
  };

  /* ===========================================
     ADSENSE LOADER
     =========================================== */
  function loadAdSenseScript() {
    if (!ADS_CONFIG.adsenseEnabled) return;
    if (document.querySelector('script[src*="adsbygoogle"]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADS_CONFIG.adsensePublisherId;
    document.head.appendChild(script);
  }

  /**
   * Create an AdSense ad unit element
   */
  function createAdSenseUnit(slotId, format, responsive) {
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', ADS_CONFIG.adsensePublisherId);
    ins.setAttribute('data-ad-slot', slotId);

    if (responsive) {
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
    } else if (format) {
      ins.setAttribute('data-ad-format', format);
    }

    return ins;
  }

  /**
   * Push ad to AdSense for rendering
   */
  function pushAd() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded or blocked
    }
  }

  /* ===========================================
     AFFILIATE FALLBACK BANNERS
     =========================================== */

  /**
   * Get a random affiliate banner
   */
  function getRandomBanner() {
    var banners = ADS_CONFIG.affiliateBanners;
    return banners[Math.floor(Math.random() * banners.length)];
  }

  /**
   * Create a styled affiliate banner element
   */
  function createAffiliateBanner(size) {
    var banner = getRandomBanner();
    var isVertical = size === 'sidebar';
    var link = document.createElement('a');
    link.href = banner.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer sponsored';
    link.setAttribute('data-ad-type', 'affiliate');
    link.setAttribute('data-ad-store', banner.store);
    link.style.cssText =
      'display:flex;' +
      (isVertical ? 'flex-direction:column;' : '') +
      'align-items:center;justify-content:center;gap:8px;' +
      'width:100%;height:100%;' +
      'background:linear-gradient(135deg,' + banner.color + '11,' + banner.color + '22);' +
      'border:1px solid ' + banner.color + '33;' +
      'border-radius:var(--r-lg);' +
      'text-decoration:none;color:var(--text-primary);' +
      'padding:12px 16px;box-sizing:border-box;' +
      'transition:all 0.3s ease;' +
      'cursor:pointer;overflow:hidden;position:relative;';

    var inner =
      '<div style="text-align:center;z-index:1;">' +
        '<div style="font-size:' + (isVertical ? '1.1rem' : '0.95rem') + ';font-weight:700;margin-bottom:4px;">' +
          banner.title +
        '</div>' +
        '<div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:' + (isVertical ? '8px' : '0') + ';">' +
          banner.subtitle +
        '</div>' +
        (isVertical
          ? '<span style="display:inline-block;padding:6px 18px;background:' + banner.color + ';color:#000;border-radius:var(--r-md);font-size:0.8rem;font-weight:600;margin-top:4px;">Ver ofertas →</span>'
          : '') +
      '</div>' +
      '<div style="position:absolute;top:-20px;right:-20px;font-size:4rem;opacity:0.06;pointer-events:none;">💰</div>';

    link.innerHTML = inner;

    // Hover effect
    link.addEventListener('mouseenter', function () {
      link.style.transform = 'translateY(-2px)';
      link.style.boxShadow = '0 4px 20px ' + banner.color + '22';
    });
    link.addEventListener('mouseleave', function () {
      link.style.transform = 'none';
      link.style.boxShadow = 'none';
    });

    // Click tracking
    link.addEventListener('click', function () {
      trackAdClick('affiliate_banner', banner.store, banner.link);
    });

    return link;
  }

  /* ===========================================
     AD INITIALIZATION
     =========================================== */

  /**
   * Initialize all ad slots on the page
   */
  function initAds() {
    var adSpaces = document.querySelectorAll('.ad-space');
    if (!adSpaces.length) return;

    if (ADS_CONFIG.adsenseEnabled) {
      // Load AdSense script
      loadAdSenseScript();

      // Wait for script to load, then fill slots
      setTimeout(function () {
        adSpaces.forEach(function (space) {
          fillAdSlot(space, true);
        });
      }, 500);
    } else {
      // Use affiliate banners as fallback
      adSpaces.forEach(function (space) {
        fillAdSlot(space, false);
      });
    }

    // Initialize in-feed ads for results page
    observeInfeedAds();
  }

  /**
   * Fill a single ad slot with either AdSense or affiliate banner
   */
  function fillAdSlot(space, useAdSense) {
    // Determine slot type from classes
    var slotType = 'bannerTop';
    if (space.classList.contains('ad-banner-bottom')) slotType = 'bannerBottom';
    else if (space.classList.contains('ad-sidebar')) slotType = 'sidebar';
    else if (space.classList.contains('ad-infeed')) slotType = 'infeed';
    else if (space.classList.contains('ad-leaderboard')) slotType = 'leaderboard';

    // Clear placeholder content
    space.innerHTML = '';
    space.setAttribute('data-loaded', 'true');

    if (useAdSense) {
      // Insert AdSense unit
      var slotId = ADS_CONFIG.slots[slotType] || ADS_CONFIG.slots.bannerTop;
      var responsive = (slotType === 'infeed');
      var ins = createAdSenseUnit(slotId, null, responsive);
      space.appendChild(ins);
      pushAd();
    } else {
      // Insert affiliate banner
      var size = (slotType === 'sidebar') ? 'sidebar' : 'banner';
      var banner = createAffiliateBanner(size);
      space.appendChild(banner);
    }
  }

  /**
   * Observe dynamically inserted in-feed ads (from results page JS)
   */
  function observeInfeedAds() {
    var resultsGrid = document.getElementById('results-grid');
    if (!resultsGrid) return;

    var observer = new MutationObserver(function () {
      var infeedAds = resultsGrid.querySelectorAll('.ad-infeed:not([data-loaded])');
      infeedAds.forEach(function (space) {
        fillAdSlot(space, ADS_CONFIG.adsenseEnabled);
      });
    });

    observer.observe(resultsGrid, { childList: true, subtree: true });
  }

  /* ===========================================
     AD-BLOCKER DETECTION
     =========================================== */
  function detectAdBlocker() {
    // Only check if AdSense is enabled
    if (!ADS_CONFIG.adsenseEnabled) return;

    setTimeout(function () {
      var testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox ad-test';
      testAd.style.cssText = 'position:absolute;left:-9999px;height:1px;width:1px;';
      document.body.appendChild(testAd);

      setTimeout(function () {
        if (testAd.offsetHeight === 0) {
          showAdBlockerMessage();
        }
        testAd.remove();
      }, 200);
    }, 2000);
  }

  function showAdBlockerMessage() {
    var msg = document.createElement('div');
    msg.style.cssText =
      'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
      'background:var(--bg-card);border:1px solid var(--border-glass);' +
      'border-radius:var(--r-xl);padding:16px 24px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.3);z-index:9999;' +
      'max-width:500px;width:90%;display:flex;align-items:center;gap:12px;';
    msg.innerHTML =
      '<div style="flex:1;">' +
        '<p style="font-size:0.9rem;font-weight:600;margin-bottom:4px;">🙏 Desactiva tu bloqueador de anuncios</p>' +
        '<p style="font-size:0.8rem;color:var(--text-muted);">Los anuncios nos ayudan a mantener PriceReviewer gratis y sin costo para ti.</p>' +
      '</div>' +
      '<button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.2rem;padding:4px;">✕</button>';
    document.body.appendChild(msg);

    // Auto-dismiss after 8 seconds
    setTimeout(function () {
      if (msg.parentElement) {
        msg.style.transition = 'opacity 0.5s';
        msg.style.opacity = '0';
        setTimeout(function () { msg.remove(); }, 500);
      }
    }, 8000);
  }

  /* ===========================================
     CLICK TRACKING (for analytics)
     =========================================== */

  /**
   * Track ad/affiliate clicks — sends to console for now.
   * Replace with your analytics endpoint (Google Analytics, etc.)
   */
  function trackAdClick(type, store, url) {
    console.log('[PriceReviewer Ad Click]', { type: type, store: store, url: url, timestamp: new Date().toISOString() });

    // Google Analytics event (if gtag is loaded)
    if (typeof gtag === 'function') {
      gtag('event', 'ad_click', {
        event_category: 'monetization',
        event_label: store,
        ad_type: type,
        destination_url: url
      });
    }
  }

  /**
   * Track all affiliate link clicks on the page
   */
  function initAffiliateTracking() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="tag=pricereview"], a[href*="aff=pricereview"], a[href*="aff_id=pricereview"], a[href*="utm_source=pricereview"]');
      if (link) {
        trackAdClick('affiliate_link', link.hostname, link.href);
      }
    });
  }

  /* ===========================================
     GOOGLE ANALYTICS SETUP
     =========================================== */

  /**
   * Load Google Analytics 4
   * Replace GA_MEASUREMENT_ID with your real GA4 ID (G-XXXXXXXXXX)
   */
  var GA_CONFIG = {
    enabled: false,
    measurementId: 'G-XXXXXXXXXX'
  };

  function loadGoogleAnalytics() {
    if (!GA_CONFIG.enabled) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_CONFIG.measurementId;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_CONFIG.measurementId);
  }

  /* ===========================================
     BOOTSTRAP
     =========================================== */
  function boot() {
    loadGoogleAnalytics();
    initAds();
    detectAdBlocker();
    initAffiliateTracking();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Expose config for easy editing from console
  window.PR_ADS = ADS_CONFIG;
  window.PR_GA = GA_CONFIG;

})();
