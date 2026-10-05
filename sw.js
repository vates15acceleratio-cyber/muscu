/* Muscu — Service Worker
   Stratégie : cache-first pour l'app shell, network-first pour le reste.
   CACHE_VERSION suit APP_VERSION dans app.js (bumpée à chaque commit + push ;
   depuis la 5.0.0 : majeur.mineur.correctif, ex. 5.1.0 ou 5.0.1) — garder les deux synchronisées.
   Mise à jour : la nouvelle version s'installe en arrière-plan puis attend ;
   app.js (Updater) prévient l'utilisateur de relancer l'app. */

const CACHE_VERSION = 'muscu-v5.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './i18n.js',
  './i18n-desc.js',
  './i18n-poses.js',
  './schemas.js',
  './splash.webp',
  './splash-gear.webp',
  './splash-stars.webp',
  './splash-portrait.webp',
  './splash-portrait-gear.webp',
  './splash-portrait-stars.webp',
  './cinzel-700-latin.woff2',
  './manifest.webmanifest',
  './icon-192.svg',
  './icon-512.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
    // Pas de skipWaiting automatique : la nouvelle version attend (« waiting »)
    // que l'utilisateur relance l'app, ou touche « Relancer » (message SKIP_WAITING).
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
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
  // Ne jamais intercepter ni mettre en cache autre chose que sa propre origine.
  if (new URL(req.url).origin !== self.location.origin) return;

  // Network-first pour le HTML (pour récupérer rapidement les MAJ)
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then(res => {
        // On ne garde en cache que les réponses 200 : une page d'erreur ne doit pas remplacer l'app hors-ligne.
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        }
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
