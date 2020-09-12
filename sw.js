const staticWeatherApp = "weather-app-v1";
const assets = ["./",
                "./favicon.ico",
                "./index.html",
                "./app.js",
                "./style.css",
                "./icons",
                "./font/Rimouski.css",
                "./manifest.json",
                "./icons/unknown.png",
                "./icons/01d.png",
                "./icons/01n.png",
                "./icons/02d.png",
                "./icons/02n.png",
                "./icons/03d.png",
                "./icons/03n.png",
                "./icons/04d.png",
                "./icons/04n.png",
                "./icons/09d.png",
                "./icons/09n.png",
                "./icons/10d.png",
                "./icons/10n.png",
                "./icons/11d.png",
                "./icons/11n.png",
                "./icons/13d.png",
                "./icons/13n.png",
                "./icons/50d.png",
                "./icons/50n.png",
                "./icons/cloud.png",
                "./icons/maskable_icon.png",
                "./icons/sun.png",
                "./font/rimouski_sb-webfont.ttf",
                "./font/rimouski_sb-webfont.woff",
                "./font/rimouski_sb-webfont.woff2"
]
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(staticWeatherApp).then(cache => {
            return cache.addAll(assets);
    })
    );
    });
    


self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('./data.json').then(function(cache) {
      return fetch(e.request).then(function(response) {
        cache.put(e.request, response.clone());
        return response;
      });
    })
  );
});

