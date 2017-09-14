// import $ from 'jquery';


import Appshell from "./appshell";
var appshell = new Appshell($("#content"));



appshell.loadAndRender("java");




//first register service worker
if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register')
} else {
    //Register the ServiceWorker
    navigator.serviceWorker.register('sw.js', {
        scope: './'
    }).then(function (reg) {
        console.log('Service worker has been registered for scope:' + reg.scope);
    });
}





$("#search-input").on({
    keyup: function (e) {
        if (e.keyCode == 13) {
            appshell.loadAndRender($("#search-input").val());
        }
    }
});

$("#search-btn").on({
    click: function () {
        appshell.loadAndRender($("#search-input").val());
    }
});