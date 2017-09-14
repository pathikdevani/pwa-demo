var files = [
    "/",
    "/dist/app.css",
    '/data',
    "/dist/app.js",
    '/fonts/segoe-ui/segoeui.ttf',
    '/libs/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf'
];

var staticCache = "static";
var githubCache = "github";



self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticCache)
            .then((cache) => {
                return cache.addAll(files)
                    .then(() => {
                        return self.skipWaiting();
                    })
                    .catch((error) => {
                        console.error('Failed to cache', error);
                    });
            })
    );
});


var githubHost = "api.github.com";


self.addEventListener('fetch', function (event) {
    var request = event.request;
    var url = new URL(request.url);

    if (url.host === githubHost) {
        event.respondWith(
            fetch(request.url).then(function (response) {
                var clonedResponse = response.clone();
                caches.open(githubCache).then(function (cache) {
                    cache.put(new Request(githubHost), clonedResponse);
                });
                return response;
            }).catch(function () {
                // debugger;
                return caches.match(new Request(githubHost)).then(function (response) {
                    return response;
                });
            })
        );

    } else {

        // match and return cache response otherwise fetch from server 
        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request);
            })
        );
    }

});

