/*
  Khushi Hospital & Laparoscopy Centre — service worker
  Precaches the site shell so pages, styles and images keep working offline
  (poor connectivity in Dalsinghsarai is the main reason for this).
  Bump CACHE_VERSION whenever site files change so the new ones get fetched.
*/
"use strict";

var CACHE_VERSION = "v1";
var CACHE_NAME = "khushi-hospital-" + CACHE_VERSION;

var PRECACHE_PATHS = [
  "./",
  "index.html",
  "about.html",
  "services.html",
  "facilities.html",
  "contact.html",
  "faq.html",
  "privacy.html",
  "terms.html",
  "404.html",
  "manifest.json",
  "assets/css/style.css",
  "assets/js/main.js",
  "assets/icons/logo.png",
  "assets/icons/favicon.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/images/og-image.png",
  "assets/images/doctor/doctor-hero.svg",
  "assets/images/doctor/doctor-profile.svg",
  "assets/images/gallery/exterior.svg",
  "assets/images/gallery/reception.svg",
  "assets/images/gallery/consultation-room.svg",
  "assets/images/gallery/patient-room.svg",
  "assets/images/gallery/equipment.svg",
  "assets/images/gallery/waiting-area.svg"
];

var RUNTIME_CACHE_ORIGINS = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "https://cdnjs.cloudflare.com"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      var urls = PRECACHE_PATHS.map(function (path) {
        return new URL(path, self.registration.scope).href;
      });
      return cache.addAll(urls);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url = new URL(request.url);
  var offlineFallback = new URL("index.html", self.registration.scope).href;

  // Page navigations: try the network first (so visitors get fresh content
  // when online), fall back to the cached page, then to the cached homepage.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || caches.match(offlineFallback);
        });
      })
    );
    return;
  }

  var isSameOrigin = url.origin === self.location.origin;
  var isCacheableThirdParty = RUNTIME_CACHE_ORIGINS.indexOf(url.origin) !== -1;
  if (!isSameOrigin && !isCacheableThirdParty) return;

  // Static assets (CSS, JS, images, fonts, icons): cache-first, refresh in background.
  event.respondWith(
    caches.match(request).then(function (cached) {
      var networkFetch = fetch(request).then(function (response) {
        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, response.clone()); });
        return response;
      }).catch(function () { return cached; });
      return cached || networkFetch;
    })
  );
});
