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
"index.html": "a7e7761c85ae20ee8d24a386f5554b93",
"/": "a7e7761c85ae20ee8d24a386f5554b93",
"main.dart.js": "00635af0fd402f2a5b02892c9caec533",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "a5483c184b3deb3adc4cd8fa93a994a8",
"icons/Icon-192.png": "12d05db1c0b26d429b54e3f8c946a496",
"icons/favicon.png": "a5483c184b3deb3adc4cd8fa93a994a8",
"icons/Icon-512.png": "aabba36693aba0ec8d954adf297d3125",
"manifest.json": "b2ca6abdd82eaae81acd8c9a5dcc1f34",
"assets/dotenv/staging.env": "5c858128757b0e7080822a3e27855e70",
"assets/dotenv/production.env": "2e6b94a3874273c627c446572f6243f9",
"assets/dotenv/dev.env": "2e6b94a3874273c627c446572f6243f9",
"assets/dotenv/global.env": "d04ccc9fbd5c455c4b0426e471b0b183",
"assets/AssetManifest.json": "4da8b5ab7ee19a2ebd52185473f29f0f",
"assets/NOTICES": "0e58a00317f95641a648f54260cf4efb",
"assets/FontManifest.json": "092878cdde614c0232552685adb518ab",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_phosphor_icons/fonts/Phosphor.ttf": "7c29adb0b02f7d84da8413452ea95c00",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "198f1d56f3db28ca1c04798a9032698e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/mock_data/appointment_metas.json": "ed12769671fbbb3bdb261f27706296c8",
"assets/assets/mock_data/customers.json": "d7b16d8f86493489dda3bad4b11aed18",
"assets/assets/mock_data/appointments.json": "95e3759838538f8594c58d392215b705",
"assets/assets/flutter_rive.riv": "d0802f9a79fb2e387c86d44ce2bc2110",
"assets/assets/image/logo_v2.png": "34a0ad57a1db8b5faf3aa45a6ed8ab19",
"assets/assets/image/new_moon_with_face.png": "5947576bc8ab043f24014306be8aa0a1",
"assets/assets/image/felix_avatar_casual.jpeg": "c5159372c0a15866b884e4e9e794b5be",
"assets/assets/image/paper_background.jpg": "829c8894425ff27439693eb846907304",
"assets/assets/image/felix_avatar.jpeg": "2a70567e7be9ac951277c592d5b912b0",
"assets/assets/image/logo.png": "34a0ad57a1db8b5faf3aa45a6ed8ab19",
"assets/assets/image/sun_with_face.png": "148b82db1274b72d5e9f395c6a73317a",
"assets/assets/google_fonts/AbhayaLibre-Bold.ttf": "b5884fd1ea00658948a60059981cfff0",
"assets/assets/google_fonts/Oswald-Bold.ttf": "452bfeb5bf78e71cc3cd6e720ac24bd4",
"assets/assets/google_fonts/Oswald-SemiBold.ttf": "6a5d13d326956086b84d9c7fb66d2d75",
"assets/assets/google_fonts/Oswald-Medium.ttf": "14cf874b374ca47427bbceb4b2373c3a",
"assets/assets/google_fonts/AbhayaLibre-Regular.ttf": "cce45583d8de01e7ac5f043831ae4f25",
"assets/assets/google_fonts/AbhayaLibre-Medium.ttf": "4fe4c6b863caf14d66993244284f2a22",
"assets/assets/google_fonts/AbhayaLibre-ExtraBold.ttf": "8456400f418c856a224282c9ff1fb687",
"assets/assets/google_fonts/Oswald-Regular.ttf": "a7ccbd3cd9a9ff21ec41086dcc23ebe6",
"assets/assets/google_fonts/AbhayaLibre-SemiBold.ttf": "a8171fbcfc07f57206aa1a7ed2eec700",
"assets/assets/google_fonts/OFL.txt": "ef34cc9815acd4b481c9d5c44320034f",
"assets/assets/google_fonts/Oswald-ExtraLight.ttf": "bae2f0108b0aad1a511a8f654cc16c0e",
"assets/assets/google_fonts/JetBrainsMono-ExtraLight.ttf": "e4a6d800b578ff24a63c391abecbb078",
"assets/assets/google_fonts/Oswald-Light.ttf": "6ee38c23e5466cb24e844b1c345d610d",
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
