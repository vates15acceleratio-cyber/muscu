/* Muscu — Service Worker
   Stratégie : cache-first pour l'app shell, network-first pour le reste.
   CACHE_VERSION suit APP_VERSION dans app.js (bumpée à chaque commit + push :
   évolution notable = +0,1 -> 4.5 ; correctif très mineur -> 4.41, 4.42...)
   — garder les deux synchronisées. */

const CACHE_VERSION = 'muscu-v4.41';
const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './i18n.js',
  './i18n-desc.js',
  './manifest.webmanifest',
  './icon-192.svg',
  './icon-512.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Network-first pour le HTML (pour récupérer rapidement les MAJ)
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first pour le reste
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
