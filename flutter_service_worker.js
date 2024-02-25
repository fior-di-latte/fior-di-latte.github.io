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
"index.html": "e5c7b680ec5793223c50d8720ecc40d2",
"/": "e5c7b680ec5793223c50d8720ecc40d2",
"main.dart.js": "5a0018032b6feedd9b28e214bfe8d5d8",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "a5483c184b3deb3adc4cd8fa93a994a8",
"icons/favicon.png": "a5483c184b3deb3adc4cd8fa93a994a8",
"manifest.json": "2cd9119373626c311d820b9740f44940",
"assets/dotenv/staging.env": "5c858128757b0e7080822a3e27855e70",
"assets/dotenv/production.env": "2e6b94a3874273c627c446572f6243f9",
"assets/dotenv/dev.env": "2e6b94a3874273c627c446572f6243f9",
"assets/dotenv/global.env": "d04ccc9fbd5c455c4b0426e471b0b183",
"assets/AssetManifest.json": "c619970486ba340d41a772ec4aecb6ba",
"assets/NOTICES": "b52f8ea367d81c8b83e98db4fc35b98d",
"assets/FontManifest.json": "fe70ca657b659a940ff24d6f0f92b649",
"assets/AssetManifest.bin.json": "1adbb01b00a38a1e950444107bbd1aaa",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "4707f3b30abce8ef54ada8ee421e209e",
"assets/packages/flutter_phosphor_icons/fonts/Phosphor.ttf": "ae434202ddb6730654adbf02f8f3bc5d",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "1c18c6a5ef033b50db12857359515907",
"assets/fonts/MaterialIcons-Regular.otf": "7f743df27c47f51625571e45c5f3710b",
"assets/assets/image/red_arrow.png": "22e2e9d4d6390e4c657115db59c65ebd",
"assets/assets/image/new_moon_with_face.png": "5947576bc8ab043f24014306be8aa0a1",
"assets/assets/image/felix_avatar_casual.jpeg": "c5159372c0a15866b884e4e9e794b5be",
"assets/assets/image/paper_background.jpg": "829c8894425ff27439693eb846907304",
"assets/assets/image/felix_avatar.jpeg": "2a70567e7be9ac951277c592d5b912b0",
"assets/assets/image/paperclip.png": "13099d82dd4f8a3f24504e207d3b97b8",
"assets/assets/image/twitter-logo.png": "c019bd434e5489eb40e386b60cf045c9",
"assets/assets/image/github-logo.png": "43ce87609eb221d09d4832a9c0e709d0",
"assets/assets/image/sun_with_face.png": "148b82db1274b72d5e9f395c6a73317a",
"assets/assets/google_fonts/BebasNeue-Regular.ttf": "b2b293064f557c41411aac04d6f6710d",
"assets/assets/google_fonts/OFL.txt": "ef34cc9815acd4b481c9d5c44320034f",
"assets/assets/google_fonts/JetBrainsMono-ExtraLight.ttf": "e4a6d800b578ff24a63c391abecbb078",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
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
