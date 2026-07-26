const CACHE_NAME = "bomberman-v1";
const ASSETS = ["/", "/index.html", "/styles.css", "/main.js", "/favicon.ico", "/manifest.webmanifest"];

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => (key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())))
    )
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const req = event.request;

  // Block insecure requests defensively (shouldn’t happen on GitHub Pages)
  if (req.url.startsWith("http:")) {
    event.respondWith(new Response("Blocked insecure request", { status: 400 }));
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req);
    })
  );
});
