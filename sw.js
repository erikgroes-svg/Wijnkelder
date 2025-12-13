self.addEventListener("install", () => {
  console.log("SW install (uitgeschakeld)");
});

self.addEventListener("activate", () => {
  console.log("SW actief (maar geen cache)");
});
