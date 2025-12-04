// sw.js
// =======================
// SERVICE WORKER v7.4 (CASE SENSITIVE FIX)
// =======================

const CACHE_NAME = 'satelital-ultra-v7.4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  // CRÍTICO: Ajustado a 'CSS' mayúscula para coincidir con tu carpeta en GitHub
  './CSS/style.css', 
  './js/main.js',
  './js/stations.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Si uno falla, todo falla. Verifica que los nombres sean EXACTOS.
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((err) => {
        console.error('[SW] Error crítico cacheando archivos:', err);
      })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Limpiando versión antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
