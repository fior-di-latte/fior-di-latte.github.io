'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "81db7a0c454f99ee5970c3d5e075f6d4",
"splash/img/light-2x.png": "47e1bede0589121f72bf45d5a7642026",
"splash/img/dark-4x.png": "4166aa0e19fbe0e7eba0038189a3ae79",
"splash/img/light-3x.png": "671434291e31c26631325148d240d637",
"splash/img/dark-3x.png": "671434291e31c26631325148d240d637",
"splash/img/light-4x.png": "4166aa0e19fbe0e7eba0038189a3ae79",
"splash/img/dark-2x.png": "47e1bede0589121f72bf45d5a7642026",
"splash/img/dark-1x.png": "767fc87b0baf518313f452f18d929745",
"splash/img/light-1x.png": "767fc87b0baf518313f452f18d929745",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "6efb53cfe1e7d58b982ef8deebe8c6d9",
"index.html": "e22646383f63b37f230195ddec3ab38f",
"/": "e22646383f63b37f230195ddec3ab38f",
"main.dart.js": "cd827ab68bd45215b2037e99854447e8",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "a5483c184b3deb3adc4cd8fa93a994a8",
"icons/favicon.png": "a5483c184b3deb3adc4cd8fa93a994a8",
"manifest.json": "2cd9119373626c311d820b9740f44940",
"assets/dotenv/staging.env": "5c858128757b0e7080822a3e27855e70",
"assets/dotenv/production.env": "2e6b94a3874273c627c446572f6243f9",
"assets/dotenv/dev.env": "2e6b94a3874273c627c446572f6243f9",
"assets/dotenv/global.env": "d04ccc9fbd5c455c4b0426e471b0b183",
"assets/AssetManifest.json": "f35ea0418d52ba4ca36de3e8d4430b52",
"assets/NOTICES": "0e58a00317f95641a648f54260cf4efb",
"assets/FontManifest.json": "350ee0350d91cec5e066912900efe48c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_phosphor_icons/fonts/Phosphor.ttf": "7c29adb0b02f7d84da8413452ea95c00",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "980b9816e43a74d9ccf54c32faae0141",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/image/new_moon_with_face.png": "5947576bc8ab043f24014306be8aa0a1",
"assets/assets/image/felix_avatar_casual.jpeg": "c5159372c0a15866b884e4e9e794b5be",
"assets/assets/image/paper_background.jpg": "829c8894425ff27439693eb846907304",
"assets/assets/image/felix_avatar.jpeg": "2a70567e7be9ac951277c592d5b912b0",
"assets/assets/image/twitter-logo.png": "c019bd434e5489eb40e386b60cf045c9",
"assets/assets/image/github-logo.png": "43ce87609eb221d09d4832a9c0e709d0",
"assets/assets/image/sun_with_face.png": "148b82db1274b72d5e9f395c6a73317a",
"assets/assets/google_fonts/OFL.txt": "ef34cc9815acd4b481c9d5c44320034f",
"assets/assets/google_fonts/JetBrainsMono-ExtraLight.ttf": "e4a6d800b578ff24a63c391abecbb078",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
