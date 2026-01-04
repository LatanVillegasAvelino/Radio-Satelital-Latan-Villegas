/* sw.js - Service Worker para Radio Satelital */
const CACHE_NAME = 'radio-ultra-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './stations.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. INSTALACIÓN: Descarga los archivos a la memoria del celular
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando archivos de la App');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activar inmediatamente sin esperar
});

// 2. ACTIVACIÓN: Limpia cachés viejas si actualizas la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Borrando caché vieja:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. INTERCEPTOR (FETCH): Sirve la App desde la caché (Offline)
self.addEventListener('fetch', (event) => {
  // Solo cacheamos archivos propios, NO el streaming de audio
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en caché, lo devuelve (velocidad extrema)
      if (cachedResponse) {
        return cachedResponse;
      }
      // Si no, lo busca en internet
      return fetch(event.request);
    })
  );
});
