// キャッシュ名（バージョン管理用）
const CACHE_NAME = "nagar-editor-cache-v1";

// キャッシュするファイル
const urlsToCache = [
  "./",
  "index.html",
  "manifest.json",
  "Nagar-Editor-icon-blue-192.png",
  "Nagar-Editor-icon-blue-512.png"
];

// インストール時にキャッシュする
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// オフライン時はキャッシュから返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});