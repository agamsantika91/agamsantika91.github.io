importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
  );
  
  if (workbox) console.log(`Workbox berhasil dimuat`);
  else console.log(`Workbox gagal dimuat`);
  
  workbox.precaching.precacheAndRoute(
    [
      {
        url: "./index.html",
        revision: "2",
      },
      {
        url: "./nav.html",
        revision: "2",
      },
      {
        url: "/",
        revision: "2",
      },
      {
        url: "./fav.html",
        revision: "2",
      },
      {
        url: "./detail.html",
        revision: "2",
      },
      {
        url: "./favicon.ico",
        revision: "2",
      },
      {
        url: "./manifest.json",
        revision: "2",
      },
      {
        url: "./assets/css/materialize.min.css",
        revision: "2",
      },
      {
        url: "./assets/css/style.css",
        revision: "2",
      },
      {
        url: "./assets/images/logo.png",
        revision: "2",
      },
      {
        url: "./assets/images/TIM.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-128x128.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-144x144.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-152x152.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-192x192.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-384x384.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-512x512.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-72x72.png",
        revision: "2",
      },
      {
        url: "./assets/images/icons/icon-96x96.png",
        revision: "2",
      },
      {
        url: "./assets/js/api.js",
        revision: "2",
      },
      {
        url: "./assets/js/app.js",
        revision: "2",
      },
      {
        url: "./assets/js/db.js",
        revision: "2",
      },
      {
        url: "./assets/js/detail.js",
        revision: "2",
      },
      {
        url: "./assets/js/fav.js",
        revision: "2",
      },
      {
        url: "./assets/js/idb.js",
        revision: "2",
      },
      {
        url: "./assets/js/materialize.min.js",
        revision: "2",
      },
      {
        url: "./assets/js/nav.js",
        revision: "2",
      },
      {
        url: "./assets/js/sw_index.js",
        revision: "2",
      },
      {
        url: "./assets/js/content/favTeams.js",
        revision: "2",
      },
      {
        url: "./assets/js/content/matches.js",
        revision: "2",
      },
      {
        url: "./assets/js/content/standing.js",
        revision: "2",
      },
      {
        url: "./assets/js/content/teams.js",
        revision: "2",
      },
      {
        url: "./assets/js/content/topScorer.js",
        revision: "2",
      },
      {
        url: "./pages/club.html",
        revision: "2",
      },
      {
        url: "./pages/favourite.html",
        revision: "2",
      },
      {
        url: "./pages/home.html",
        revision: "2",
      },
      {
        url: "./pages/match.html",
        revision: "2",
      },
      {
        url: "./pages/topScorers.html",
        revision: "2",
      },
    ],
    {
      ignoreUrlParametersMatching: [/.*/],
    }
  );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        new RegExp('pages'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages',
        })
    );

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'image',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60, 
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'js',
        })
    );
    workbox.routing.registerRoute(
        new RegExp("/"),
        workbox.strategies.staleWhileRevalidate({
          cacheName: "root",
        })
      );
      
      workbox.routing.registerRoute(
        new RegExp("/assets/images/icons/"),
        workbox.strategies.staleWhileRevalidate({
          cacheName: "icons",
        })
      );
      
      workbox.routing.registerRoute(
        ({ url }) =>
          url.origin === "https://fonts.googleapis.com" ||
          url.origin === "https://fonts.gstatic.com",
        new workbox.strategies.CacheFirst({
          cacheName: "fonts",
        })
      );
      
      workbox.routing.registerRoute(
        ({ url }) => url.origin === "https://api.football-data.org",
        new workbox.strategies.CacheFirst({
          cacheName: "data-api",
          plugins: [
            new workbox.cacheableResponse.CacheableResponse({
              statuses: [0, 200, 404],
              headers: {
                "Access-Control-Expose-Headers": "X-Is-Cacheable",
                "X-Is-Cacheable": "yes",
              },
            }),
          ],
        })
      );
      


self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: '/assets/images/TIM.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});