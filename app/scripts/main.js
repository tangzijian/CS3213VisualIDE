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
            tolerance: "touch",
            stop: function(event, ui) {
                $("#editor_workspace li").removeClass("draggable ui-draggable ui-draggable-handle");
                $("#editor_workspace ul").addClass("ui-sortable");
                $("#editor_workspace ul").sortable({
                     connectWith: "#editor_workspace ul"
                });
            }
        });
    }
};

$(document).ready(function () {
    'use strict';
    Playground.init();
    Backbone.history.start();
});
