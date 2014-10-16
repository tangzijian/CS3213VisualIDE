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
        $("#editor_workspace ul").sortable({
            stop: function(event, ui) {
                var controlBlocks = $("#workspace-sortable li").has("li");
                // controlBlocks.find(".block-control-botm").last().css("margin-top","-14px");
                var subBlocks = controlBlocks.find("li");
                var height = 97;
                if (subBlocks.length>1) {
                    height =  97 + (subBlocks.length-1)*33;
                }
            }
        });
        $("#editor_workspace ul").sortable("refreshPositions");
    }
};

$(document).ready(function () {
    'use strict';
    Playground.init();
    Backbone.history.start();
});
