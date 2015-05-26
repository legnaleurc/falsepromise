// ==UserScript==
// @name        FalsePromise
// @namespace   FoolproofProject
// @copyright   2015+, Wei-Cheng Pan (lengaleurc)
// @version     2
// @license     BSD
// @grant       unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    var p = unsafeWindow.Promise;
    if (!p) {
        // nothing to fix
        return;
    }

    try {
        p.resolve();
    } catch (e) {
        // do this only in Gecko 25~27
        ['resolve', 'reject'].forEach(function (sm) {
            var osm = p[sm];
            p[sm] = function (value) {
                return osm.call(p, value);
            };
        });
    }

})();
