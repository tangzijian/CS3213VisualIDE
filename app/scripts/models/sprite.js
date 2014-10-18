/*global Playground, Backbone*/

Playground.Models = Playground.Models || {};

(function () {
    'use strict';

    Playground.Models.Sprite = Backbone.Model.extend({

        xPos : 0,
        yPos : 0,
        isShown :true,
        costume :'./images/costume1.jpg',
        url: '',
        array_of_commands: [],
        commands: {name: "", para: []},
        backgroundImg: '',

        initialize: function() {
        },

        defaults: {
            xPos : 0,
            yPos : 0,
            isShown :true,
            costume :'./images/costume1.jpg',
            url: '',
            array_of_commands: [],
            background: '',
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        add: function(index, position, parameters){
           switch(index){
                case 0:
                console.log("add first type of function: setXPos");
                commands.name = "setXPos";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 1:
                console.log("add second type of function: setYPos");
                 commands.name = "setYPos";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 2:
                console.log("add third type of function: changeCostume");
                 commands.name = "changeCostume";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 3:
                console.log("add fourth type of function: changeBackground");
                 commands.name = "changeBackground";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 4:
                console.log("add fourth type of function: hide");
                 commands.name = "hide";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 5:
                console.log("add fourth type of function: show");
                 commands.name = "show";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 6:
                console.log("add fourth type of function: move");
                 commands.name = "move";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
                case 7:
                console.log("add fourth type of function: repeat");
                 commands.name = "repeat";
                commands.para = parameters;
                console.log(commands);
                this.get('array_of_commands').splice(position,0,commands);
                console.log(array_of_commands);
                break;
           }
        },

        deleteCommand: function(position){
            delete this.array_of_commands[position];
            console.log(this.array_of_commands);
        },

/*
        setXPos: function(){
            this.set('xPos',this.parameters[0]);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name: "setXPos", backgroundImg:this.backgroundImg};
            return obj;
        },

        setYPos: function(){
            this.set('yPos',this.parameters[0]);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name: "setYPos",backgroundImg:this.backgroundImg};
            return obj;
        },

        changeCostume: function(){
            this.set('costume',this.parameters[0]);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"changeCostume",backgroundImg:this.backgroundImg};
            return obj;
        },

        changeBackground: function(){
            this.set('backgroundImg',this.parameters[0]);
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

        move: function(){
            this.set('xPos',xPos+parameters[0]);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"move",backgroundImg:this.backgroundImg};
            return obj;
        },

        repeat: function(){
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, function_name:"repeat",backgroundImg:this.backgroundImg, times: parameters[0], commands: this.parameters[1]};
            return obj;
        },
*/

    });


})();
