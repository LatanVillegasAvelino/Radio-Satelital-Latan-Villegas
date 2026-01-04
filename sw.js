/* sw.js - Service Worker Avanzado para Radio Satelital */

// Nombre de la caché (cámbialo si actualizas la app para forzar recarga)
const CACHE_NAME = 'radio-satelital-v8-offline';

// Archivos vitales que se guardarán para funcionar sin internet
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './stations.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // Si tienes un archivo 'offline.html' específico, agrégalo aquí
];

// 1. INSTALACIÓN: Guarda la "App Shell" (esqueleto de la app)
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando y cacheando recursos...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Fuerza al SW a activarse de inmediato
});

// 2. ACTIVACIÓN: Limpia cachés antiguas para no ocupar espacio
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
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
  self.clients.claim(); // Toma control de la página inmediatamente
});

// 3. ESTRATEGIA DE CARGA (Stale-While-Revalidate modificado)
// Intenta servir desde caché primero (rápido), luego actualiza desde la red en segundo plano
self.addEventListener('fetch', (event) => {
  // Ignora peticiones que no sean GET o que sean a otros dominios (como el streaming de audio)
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si tenemos el archivo en caché, lo devolvemos
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Y en paralelo, bajamos la versión nueva y actualizamos la caché
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Si falla la red (offline), no pasa nada si ya devolvimos caché
      });

      // Devuelve lo que halló en caché, o espera a la red si no había nada
      return cachedResponse || fetchPromise;
    })
  );
});

// 4. SINCRONIZACIÓN EN SEGUNDO PLANO (Background Sync)
// Esto permite reintentar acciones (como guardar favoritos) cuando vuelva el internet
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    console.log('[Service Worker] Sincronizando favoritos en segundo plano...');
    // Aquí iría la lógica para enviar datos al servidor si tuvieras backend
    // Por ahora, solo dejamos el log para cumplir con el requisito de PWA
  }
});
