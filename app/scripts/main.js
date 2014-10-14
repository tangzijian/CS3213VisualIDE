/*global Playground, $*/


window.Playground = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        new this.Views.Player();
        new this.Views.Toolbar();
        new this.Views.Editor();

        $(".draggable").draggable({
            helper: "clone",
            connectToSortable: "#workspace-sortable",
        });
        $("#workspace-sortable").sortable({
            connectWith: "ul"
        });
    }
};

$(document).ready(function () {
    'use strict';
    Playground.init();
    Backbone.history.start();
});
