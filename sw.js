const CACHE_NAME = "wijnkelder-cache-v1";

const APP_FILES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/icon-192.png",
  "/icon-512.png"
];

// Install: cache basisbestanden
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_FILES);
    })
  );
  self.skipWaiting();
});

// Activate: oude caches opruimen
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
  console.log("Wijnkelder service worker actief");
});

// Fetch: eerst cache, dan netwerk
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
