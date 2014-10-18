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
        isReady: false,

        initialize: function() {
        },

        defaults: {
            xPos : 0,
            yPos : 0,
            isShown :true,
            costume :'./images/costume1.jpg',
            url: '',
            array_of_commands: [],
            backgroundImg: '',
            isReady: false,
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        add: function(type, position, parameters){
           switch(type){
                case "command_set_x":
                console.log("add first type of function: setXPos");
                this.commands.name = "setXPos";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_set_y":
                console.log("add second type of function: setYPos");
                this.commands.name = "setYPos";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_change_costume":
                console.log("add third type of function: changeCostume");
                this.commands.name = "changeCostume";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_change_background":
                console.log("add fourth type of function: changeBackground");
                this.commands.name = "changeBackground";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_hide":
                console.log("add fourth type of function: hide");
                this.commands.name = "hide";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_show":
                console.log("add fourth type of function: show");
                this.commands.name = "show";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_move":
                console.log("add fourth type of function: move");
                this.commands.name = "move";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                case "command_repeat":
                console.log("add fourth type of function: repeat");
                this.commands.name = "repeat";
                this.commands.para = parameters;
                this.get('array_of_commands').splice(position,0,this.commands);
                break;
                default:
                console.log("invalid command: "+type);
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
