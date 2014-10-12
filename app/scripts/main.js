/*global Playground, $*/


window.playground = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
    }
};

$(document).ready(function () {
    'use strict';
    playground.init();
    Backbone.history.start();
});
