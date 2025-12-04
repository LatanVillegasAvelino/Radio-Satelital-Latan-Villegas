// sw.js
// =======================
// SERVICE WORKER v7.1 (EMERGENCY FLUSH)
// =======================

const CACHE_NAME = 'satelital-ultra-v7.1'; // CAMBIO DE VERSIÓN CRÍTICO
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/stations.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Obligar a instalarse inmediatamente
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Eliminando basura antigua:', key);
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
  // Estrategia Network First para HTML (Siempre busca versión nueva)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
