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
        movements: [],

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
            this.clearCanvas();
            this.commands_list = this.model.array_of_commands;
            var index;
            console.log(this.model.array_of_commands);
            for(index = 0; index<this.commands_list.length;index++){
                var command = this.commands_list[index];
                console.log(command);
                switch(command.name){
                    case "setXPos":
                        this.current_status.xPos = command.para[0];
                        this.draw();
                        break;
                    case "setYPos":
                        this.current_status.yPos = command.para[0];
                        this.draw();
                        break;
                    case "show":
                        this.current_status.shown = true;
                        this.draw();
                        break;
                    case "hide":
                        this.current_status.shown = false;
                        break;
                    default:
                    console.log(command.para[0]);
                }
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

        execute: function(start, len){
            // stop onclick 'stop'
            var i = 0;
            var j = 0;

            while( i++ < len) {                         
                this.func_name = this.commands_list[this.index].commands.name;            // fetch specific function
                console.log("calling ", this.func);             
                movements = this.commands_list[this.index].commands.para                   // get desired status

                if (this.func_name == 'isRepeat'){
                    this.iteration[++loop_layer] = movements[0];        // get number of iteration of this loop
                    this.commands_iter[loop_layer] = movements[1];   // get numebr of commands included in this loop
                    start = ++this.index;                                    // set start be the next function index  
                    if (this.iteration[loop_layer] == 'forever'){
                        while (1){
                        this.execute(start, this.commands_iter[loop_layer]);      // infinite loop case, only wait for stop.
                        }
                    }
                    else {
                        while (j++ < this.iteration[loop_layer]){            
                        this.execute(start, this.commands_iter[loop_layer]);      // finite loop case
                        }
                        this.loop_layer--;                                   // after jumped out, reduce layer. 
                    }
                }
                else{
                    console.log("prev index", this.index);
                    this.index++;                                            // not repeat, sequensial
                    console.log("post index", this.index);
                }
            }
        },

/*
        draw: function(){
            var that = this;
            var character = document.createElement('img');
            var bg = document.createElement('img');
            var shown = this.current_status.isShown;
            // console.log(shown);

            // this.ctx.clearRect(0, 0, this.w, this.h);          // clear screen

            if (bg != ''){  
                bg.onload = function(){
                    that.ctx.drawImage(bg, 0, 0);        // draw background if applicable
                }
            }; 
            // if (shown){              ​  // This selection causes ILLEGAL. why?!!!!!!!!!!!!!!!!!!!!!!
                this.ctx.fillText("TESTING HERE!!!!!!!!", 300, 300);          // for testing purpose
                character.onload = function(){
                    console.log("that", that);
                    console.log(that.current_status);
                    console.log(that.current_status.xPos, that.current_status.yPos, character.width, character.height);
                    that.ctx.drawImage(character,that.current_status.xPos, that.current_status.yPos); //character.width, character.height);     // draw costume if status isShown is true.
                };
                console.log("outside this", this);
                character.src = this.current_status.costume;    
                bg.src = this.current_status.backgroungImg;
            // }
        },*/
      
    
        update: function (){
            
            switch(this.func_name){
                case ("setXPos"):
                    this.current_status.xPos = this.current_status.xPos + movements[0];
                    break;
                case ("setYPos"):
                    this.current_status.yPos = this.current_status.yPos + movements[0];
                    break;
                case ("changeCostume"):
                    this.current_status.costume = movements[0];
                    break;
                case ("changeBackground"):
                    this.current_status.backgroungImg = movements[0];
                    break;
                case ("show"):
                    this.current_status.isShown = true;
                    break;
                case ("hide"):
                    this.current_status.isShown = false;
                    break;
                case ("move"):
                    while (this.current_status.xPos != this.current_status.xPos + movements[0]){
                        this.current_status.xPos++;                  // move one step per frame, until it reaches the desired xPos
                    }
                    break;
            }
        },


    });

})();
