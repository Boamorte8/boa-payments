import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import type { ManifestEntry } from 'workbox-build';

interface ServiceWorkerGlobalScopeCustom extends ServiceWorkerGlobalScope {
  location: string | URL | undefined;
  addEventListener(arg0: string, arg1: (event: any) => void): any;
  skipWaiting(): any;
}

declare let self: ServiceWorkerGlobalScopeCustom;

const manifest = self.__WB_MANIFEST as Array<ManifestEntry>;
const cacheName = 'BoaPaymentsCustomCache_v1';

precacheAndRoute(manifest);

console.log('version - 08242022-13:30');

registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), {
    denylist: [/^\/backoffice/],
  })
);

registerRoute(
  ({ url }) =>
    url.origin === 'https://identitytoolkit.googleapis.com' &&
    url.pathname === '/v1/accounts:signInWithPassword',
  new NetworkFirst({
    cacheName: 'auth-login',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName));
});

function isUrl(url: string): boolean {
  const availableUrls = [
    'identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    'boa-payments-default-rtdb.firebaseio',
  ];
  return availableUrls.some((aUrl) => url.includes(aUrl));
}

self.addEventListener('fetch', (event) => {
  const availableModes = ['navigate'];
  const { request } = event;
  // Check if this is a navigation request
  if (
    availableModes.includes(request.mode) &&
    isUrl(request.url)
    // !request.referrer.includes('localhost')
  ) {
    console.log('request');
    // Open the cache
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        // Go to the network first
        return fetch(request.url)
          .then((fetchedResponse) => {
            cache.put(request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            // If the network is unavailable, get
            return cache.match(request.url);
          });
      })
    );
  } else {
    return;
  }
});
