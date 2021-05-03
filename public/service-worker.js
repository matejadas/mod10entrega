'use strict';

// CODELAB: Update cache names any time any of the cached files change.
// 1 Nombre de la caché
const CACHE_NAME = 'static-cache';

// CODELAB: Add list of files to cache here.
// 2 Array con los ficheros que hay que cachear
const FILES_TO_CACHE = [
  '/index.html',
  '/game.css',
  '/install.js',
  '/Character.js',
  '/Entity.js',
  '/Game.js',
  '/main.js',
  '/Opponent.js',
  '/Player.js',
  '/Shot.js',
  '/assets/buenomuerto.png',
  '/assets/bueno.png',
  '/assets/game_over.png',
  '/assets/jefe_muerto.png',
  '/assets/jefe.png',
  '/assets/malo_muerto.png',
  '/assets/malo.png',
  '/assets/shot1.png',
  '/assets/shot2.png',
  '/assets/you_win.png'
];

// 3 Eventos propios de los service worker

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   console.log("Fetch no navigate");
  //   return;
  // }
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});