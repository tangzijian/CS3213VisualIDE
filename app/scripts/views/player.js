/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',

        events: {
            "change .model.isReady": "play",
        },

        
        current_status : {},                  // draw this status in current frame
        // post_status : {},                     // disired statues after function func
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
            
            console.log(this.model);            
            this.current_status = {              // init status
                        xPos: this.model.get('xPos'),
                        yPos: this.model.get('yPos'),
                        isShown: this.model.get('isShown'), 
                        costume: this.model.get('costume'),
                        function_name: '',
                        backgroundImg : this.model.get('backgroundImg'),
            };
            this.render();
            console.log(this.commands_list);
            console.log( this.model.get('array_of_commands'));

            // this.command_list[0] = func;
            // console.log(this.commands_list);
            this.play();
        },

        render: function () {
            this.w = this.$el.width();
            this.h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width: this.w,height: this.h}));
            this.ctx = document.getElementById('player_canvas').getContext("2d");
            this.ctx.fillText("TESTING!!!!!!!!", 100, 100);          // for testing purpose
        },

        play: function (){
            
            setInterval(this.gameLoop(),1000/this.FPS);           // starts game loop

            // this.commands_list = this.model.get('array_of_functions');   // fetch function list 
            console.log("bai_functions", this.commands_list);
            this.execute(0, this.commands_list.length);           // execute ".length" number of functions from function 0, 
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


        gameLoop: function(){
            this.draw();                         // draw current status
            this.update();                       // update current status to desired(post) status
        },

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
        },
    
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
