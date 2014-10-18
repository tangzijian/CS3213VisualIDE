/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',

        events: {
        },

        
        current_status : {},                  // draw this status in current frame
        func_name : '',                            // current function executing
        commands_list : [],                     // list of functions need to be executed
        index : 0,                              // index in function_list
        loop_layer : -1,                        // -1 for sequensial, 0 indicates i'm in single loop, 1 means i'm inside double loop
        iteration : [],                         // it[0] indicates num of iterations for single loop 
        commands_iter : [],                     // cmd[0] indicates num of commands included in the single loop.
        FPS : 30,                               // frame per second
        ctx : null,
        w : null,
        h : null,

        initialize: function () {
            var that = this;
            $("#play_button").click(function(e){
                that.updateCanvas();       
            });
                
            this.current_status = {              // init status
                        xPos: this.model.get('xPos'),
                        yPos: this.model.get('yPos'),
                        isShown: this.model.get('isShown'), 
                        costume: this.model.get('costume'),
                        backgroundImg : this.model.get('backgroundImg'),
            };
            this.render();
            this.draw();
        },

        render: function () {

            this.w = this.$el.width();
            this.h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width: this.w,height: this.h}));
            this.ctx = document.getElementById('player_canvas').getContext("2d");
        },

        updateCanvas: function(){
            console.log("Player view: play button clicked!");
            
            this.executeFunctions();
            /* deleted gameloop, not necessary
            (function (window) {
                function gameLoop() {
                console.log("Entering game loop");
                console.log(this);
                this.drawAtCurrentPosition();
                


                }
             window.setInterval(gameLoop, 1000 / 60); // 60fps
            } (window));
*/
        },

        executeFunctions: function(){
            
            this.commands_list = this.model.array_of_commands;
            var index;
            console.log(this.model.array_of_commands);
            for(index = 0; index<this.commands_list.length;index++){
                
                var command = this.commands_list[index];
                this.executeCommand(command);
            }
        },

        executeCommand: function(command){
             switch(command.name){
                    case "setXPos":
                        this.current_status.xPos = command.para[0];
                        if(this.current_status.shown)
                        this.draw();
                        break;
                    case "setYPos":
                        this.current_status.yPos = command.para[0];
                        if(this.current_status.shown)
                        this.draw();
                        break;
                    case "show":
                        this.current_status.shown = true;
                        this.draw();
                        break;
                    case "hide":
                        this.clearCanvas();
                        this.current_status.shown = false;
                        break;
                    case "move":
                        //move in current facing direction
                        break;
                    case "changeCostume":

                        break;
                    case "changeBackground":

                        break;
                    case "repeat":

                        break;
                    default:
                        console.log("invalid command, error in code somewhere");
                }
        },

        clearCanvas: function(){
            this.ctx.clearRect(0, 0, document.getElementById('player_canvas').width, document.getElementById('player_canvas').height);
        },

        draw: function(){
            var that = this;
            var character = document.createElement('img');
            var bg = document.createElement('img');
            var shown = this.current_status.isShown;

            if (bg != ''){  
                bg.onload = function(){
                    that.ctx.drawImage(bg, 0, 0);        // draw background if applicable
                }
            }; 
            character.onload = function(){
                that.ctx.drawImage(character,that.current_status.xPos, that.current_status.yPos); //character.width, character.height);     // draw costume if status isShown is true.
            };
            character.src = this.current_status.costume;    
            bg.src = this.current_status.backgroungImg;
        },

    });

})();
