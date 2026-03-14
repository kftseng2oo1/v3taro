// ╔═══════════════════════════════════════════════╗
// ║  塔羅秘境 ARCANA — Service Worker             ║
// ║  Cache-first + Network fallback               ║
// ╚═══════════════════════════════════════════════╝
const CACHE_NAME = 'tarot-arcana-v3-20250314';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap',
];

// ── 安裝：預快取核心資源 ──────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── 啟動：清除舊版快取 ────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── 攔截請求：Cache-first 策略 ────────────────────
self.addEventListener('fetch', e => {
  // 只處理 GET 請求，跳過 chrome-extension 等
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request)
        .then(response => {
          // 只快取成功的回應
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          return response;
        })
        .catch(() => {
          // 離線時回傳主頁
          if (e.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
