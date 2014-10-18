/*global Playground, Backbone, JST*/

Playground.Views = Playground.Views || {};

(function () {
    'use strict';

    Playground.Views.Player = Backbone.View.extend({

        template: JST['app/scripts/templates/player.ejs'],

        el: '#player',

        events: {
         // "click play_button" :    "play",
        // "click stop_button" :    "stop"
        },

        
        current_status : {},                  // draw this status in current frame
        post_status : {},                     // disired statues after function func
        func : null,                            // current function executing
        function_list : [],                     // list of functions need to be executed
        index : 0,                              // index in function_list
        loop_layer : -1,                        // -1 for sequensial, 0 indicates i'm in single loop, 1 means i'm inside double loop
        iteration : [],                         // it[0] indicates num of iterations for single loop 
        commands_iter : [],                     // cmd[0] indicates num of commands included in the single loop.
        FPS : 30,                               // frame per second
        ctx : null,
        w : null,
        h : null,

        initialize: function () {
            
            console.log(this.model);            
            this.current_status = {              // init status
                        xPos: this.model.get('xPos'),
                        yPos: this.model.get('yPos'),
                        isShown: true, 
                        costume: this.model.get('costume'),
                        function_name: '',
                        backgroundImg : ''
            };
            this.render();
            console.log(this.function_list);
            console.log( this.model.get('array_of_functions'));
            this.function_list = this.model.get('array_of_functions'),
            console.log(this.function_list);
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

            this.function_list = this.model.get('array_of_functions');   // fetch function list 

            this.execute(0, this.function_list.length);           // execute ".length" number of functions from function 0, 
        },

        execute: function(start, len){
            // stop onclick 'stop'
            var i = 0;
            var j = 0;

            while( i++ < len) {                         
                this.func = this.function_list[index];            // fetch specific function
                console.log("calling ", this.func);             
                this.post_status = this.func();                   // get desired status

                if (this.post_status.function_name == 'isRepeat'){
                    this.iteration[++loop_layer] = this.post_status.times;        // get number of iteration of this loop
                    this.commands_iter[loop_layer] = this.post_status.commands;   // get numebr of commands included in this loop
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
                    this.index++;                                            // not repeat, sequensial
                }
            }
        },


        gameLoop: function(){
            this.draw();                         // draw current status
            // this.update();                       // update current status to desired(post) status
        },

        draw: function(){
            var character = document.createElement('img');
            
            var that = this;

            var bg = this.current_status.backgroungImg;
            var shown = this.current_status.isShown;
            // console.log(shown);

            // this.ctx.clearRect(0, 0, this.w, this.h);          // clear screen
            // if (bg != ''){  
            //     this.ctx.drawImage(bg, 0, 0);        // draw background if applicable
            // }; 
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
            // }
        },
    
        update: function (){
            if (this.current_status != this.post_status){
                this.current_status.function_name = this.post_status.function_name;
                switch(post_status.function_name){
                    case ("setXPos"):
                        this.current_status.xPos = this.post_status.xPos;
                        break;
                    case ("setYPos"):
                        this.current_status.yPos = this.post_status.yPos;
                        break;
                    case ("changeCostume"):
                        this.current_status.costume = this.post_status.costume;
                        break;
                    case ("changeBackground"):
                        this.current_status.backgroungImg = this.post_status.backgroungImg;
                        break;
                    case ("show"):
                        this.current_status.isShown = this.post_status.isShown;
                        break;
                    case ("hide"):
                        this.current_status.isShown = this.post_status.isShown;
                        break;
                    case ("move"):
                        this.current_status.xPos++;                  // move one step per frame, until it reaches the desired xPos
                        break;
                }
            }
        },


    });

})();
