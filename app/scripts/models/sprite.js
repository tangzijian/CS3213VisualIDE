/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Sprite = Backbone.Model.extend({

        xPos : 0,
        yPos : 0,
        isShown :true,
        costume :'./images/costume1.jpg',
        array_of_functions: [],
        parameters: [],
        backgroundImg: '',

        initialize: function() {
        },

        defaults: {
            xPos : 0,
            yPos : 0,
            isShown :true,
            costume :'./images/costume1.jpg',
            array_of_functions: [],
            background: '',
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        add: function(type, position, parameters){
            this.set('parameters',parameters);
            switch(type){
                case command_set_x:
                console.log("add first type of function: setXPos");
                this.array_of_functions.splice(position,0,this.setXPos);
                console.log(this.array_of_functions);
                break;
                case command_set_y:
                console.log("add second type of function: setYPos");
                this.array_of_functions.splice(position,0,this.setYPos);
                console.log(this.array_of_functions);
                break;
                case command_change_constume:
                console.log("add third type of function: changeCostume");
                this.array_of_functions.splice(position,0,this.changeCostume);
                console.log(this.array_of_functions);
                break;
                case command_change_background:
                console.log("add fourth type of function: changeBackground");
                this.array_of_functions.splice(position,0,this.changeBackground);
                console.log(this.array_of_functions);
                break;
                case command_hide:
                console.log("add fourth type of function: hide");
                this.array_of_functions.splice(position,0,this.hide);
                console.log(this.array_of_functions);
                break;
                case command_show:
                console.log("add fourth type of function: show");
                this.array_of_functions.splice(position,0,this.show);
                console.log(this.array_of_functions);
                break;
                case command_move:
                console.log("add fourth type of function: move");
                this.array_of_functions.splice(position,0,this.move);
                console.log(this.array_of_functions);
                break;
                case command_repeat:
                console.log("add fourth type of function: repeat");
                this.array_of_functions.splice(position,0,this.repeat);
                console.log(this.array_of_functions);
                break;
            }
        },

        deleteCommand: function(position){
            delete this.array_of_functions[position];
            console.log(this.array_of_functions);
        },

        setXPos: function(xPosition){
            this.set('xPos',xPosition);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name: "setXPos", backgroundImg:this.backgroundImg};
            return obj;
        },

        setYPos: function(yPosition){
            this.set('yPos',yPosition);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name: "setYPos",backgroundImg:this.backgroundImg};
            return obj;
        },

        changeCostume: function(link){
            this.set('costume',link);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"changeCostume",backgroundImg:this.backgroundImg};
            return obj;
        },

        changeBackground: function(link){
            this.set('backgroundImg',link);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"changeBackground",backgroundImg:this.backgroundImg};
            return obj;
        },

        show: function(){
            this.set('isShown',true);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"show",backgroundImg:this.backgroundImg};
            return obj;
        },

        hide: function(){
            this.set('isShown',false);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"hide",backgroundImg:this.backgroundImg};
            return obj;
        },

        move: function(steps){
            this.set('xPos',xPos+steps);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"move",backgroundImg:this.backgroundImg};
            return obj;
        },

        repeat: function(commands, iterations){
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"repeat",backgroundImg:this.backgroundImg, times: iterations, commands: commands};
            return obj;
        },


    });

})();
