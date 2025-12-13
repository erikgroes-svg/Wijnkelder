// sw.js (geen cache, enkel logging)
self.addEventListener("install", (event) => {
  console.log("SW install (geen cache)");
  self.skipWaiting(); // meteen nieuwe SW gebruiken
});

self.addEventListener("activate", (event) => {
  console.log("SW actief (geen cache)");
  event.waitUntil(self.clients.claim()); // meteen controle over open tabs
});
