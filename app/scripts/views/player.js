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

        
        current_status : null,                  // draw this status in current frame
        post_status : null,                     // disired statues after function func
        func : null,                            // current function executing
        function_list : [],                     // list of functions need to be executed
        index : 0,                              // index in function_list
        loop_layer : -1,                        // -1 for sequensial, 0 indicates i'm in single loop, 1 means i'm inside double loop
        iteration : [],                         // it[0] indicates num of iterations for single loop 
        commands_iter : [],                     // cmd[0] indicates num of commands included in the single loop.
        FPS : 30,                               // frame per second

        initialize: function () {
            
            console.log(this.model);            
            var current_status = {              // init status
                        xPos: 100,
                        yPos: 100,
                        isShown: true, 
                        costume: this.model.get('costume'),
                        function_name: '',
                        backgroundImg : ''
            };
            this.render();
        },

        render: function () {
            var w = this.$el.width();
            var h = this.$el.height();
            this.$el.html(this.template({id:'player_canvas',width:w,height:h}));
            var ctx = document.getElementById('player_canvas').getContext("2d");
            ctx.fillText("TESTING!!!!!!!!", 100, 100);          // for testing purpose
        },

        play: function (){
            
            setInterval(gameLoop(),1000/FPS);           // starts game loop

            function_list = this.model.get('array_of_functions');   // fetch function list 

            execute(0, function_list.length);           // execute ".length" number of functions from function 0, 
        },

        execute: function(start, len){
            // stop onclick 'stop'
            var i = 0;
            var j = 0;

            while( i++ < len) {                         
                func = function_list[index];            // fetch specific function
                console.log("calling ", func);             
                post_status = func();                   // get desired status

                if (post_status.function_name == 'isRepeat'){
                    iteration[++loop_layer] = post_status.times;        // get number of iteration of this loop
                    commands_iter[loop_layer] = post_status.commands;   // get numebr of commands included in this loop
                    start = ++index;                                    // set start be the next function index  
                    if (iteration[loop_layer] == 'forever'){
                        while (1){
                        execute(start, commands_iter[loop_layer]);      // infinite loop case, only wait for stop.
                        }
                    }
                    else {
                        while (j++ < iteration[loop_layer]){            
                        execute(start, commands_iter[loop_layer]);      // finite loop case
                        }
                        loop_layer--;                                   // after jumped out, reduce layer. 
                    }
                }
                else{
                    index++;                                            // not repeat, sequensial
                }
            }
        },


        gameLoop: function(){
            draw();                         // draw current status
            update();                       // update current status to desired(post) status
        },

        draw: function(){
            var character = current_status.costume;
            var bg = current_status.backgroungImg;
            var shown = current_status.isShown;
            // console.log(shown);

            ctx.clearRect(0, 0, w, h);          // clear screen
            if (bg != ''){  
                ctx.drawImage(bg, 0, 0);        // draw background if applicable
            }; 
            // if (shown){              ​  // This selection causes ILLEGAL. why?!!!!!!!!!!!!!!!!!!!!!!
                ctx.drawImage(character, current_status.xPos, current_status.yPos);     // draw costume if status isShown is true.
            // }
        },
    
        update: function (){
            if (current_status != post_status){
                current_status.function_name = post_status.function_name;
                switch(post_status.function_name){
                    case ("setXPos"):
                        current_status.xPos = post_status.xPos;
                        break;
                    case ("setYPos"):
                        current_status.yPos = post_status.yPos;
                        break;
                    case ("changeCostume"):
                        current_status.costume = post_status.costume;
                        break;
                    case ("changeBackground"):
                        current_status.backgroungImg = post_status.backgroungImg;
                        break;
                    case ("show"):
                        current_status.isShown = post_status.isShown;
                        break;
                    case ("hide"):
                        current_status.isShown = post_status.isShown;
                        break;
                    case ("move"):
                        current_status.xPos++;                  // move one step per frame, until it reaches the desired xPos
                        break;
                }
            }
        },


    });

})();
