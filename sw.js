/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var files = ["index.html", "dist/app.css", "dist/app.js", 'fonts/segoe-ui/segoeui.ttf', 'libs/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf'];

var staticCache = "static";
var githubCache = "github";

self.addEventListener('install', function (event) {

    event.waitUntil(caches.open(staticCache).then(function (cache) {
        return cache.addAll(files).then(function () {
            return self.skipWaiting();
        }).catch(function (error) {
            console.error('Failed to cache', error);
        });
    }));
});

var githubHost = "api.github.com";

self.addEventListener('fetch', function (event) {
    var request = event.request;
    var url = new URL(request.url);

    if (url.host === githubHost) {
        event.respondWith(fetch(request.url).then(function (response) {
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
        }));
    } else {

        // match and return cache response otherwise fetch from server 
        event.respondWith(caches.match(request).then(function (response) {
            return response || fetch(request);
        }));
    }
});

/***/ })

/******/ });
//# sourceMappingURL=sw.js.map