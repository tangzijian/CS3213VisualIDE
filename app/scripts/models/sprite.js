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
            url: '',
            array_of_functions: [],
            background: '',
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        add: function(index, position, parameters){
            this.set('parameters',parameters);
           switch(index){
                case 0:
                console.log("add first type of function: setXPos");
                this.array_of_functions.splice(position,0,this.setXPos);
                console.log(this.array_of_functions);
                break;
                case 1:
                console.log("add second type of function: setYPos");
                this.array_of_functions.splice(position,0,this.setYPos);
                console.log(this.array_of_functions);
                break;
                case 2:
                console.log("add third type of function: changeCostume");
                this.array_of_functions.splice(position,0,this.changeCostume);
                console.log(this.array_of_functions);
                break;
                case 3:
                console.log("add fourth type of function: changeBackground");
                this.array_of_functions.splice(position,0,this.changeBackground);
                console.log(this.array_of_functions);
                break;
                case 4:
                console.log("add fourth type of function: hide");
                this.array_of_functions.splice(position,0,this.hide);
                console.log(this.array_of_functions);
                break;
                case 5:
                console.log("add fourth type of function: show");
                this.array_of_functions.splice(position,0,this.show);
                console.log(this.array_of_functions);
                break;
                case 6:
                console.log("add fourth type of function: move");
                this.array_of_functions.splice(position,0,this.move);
                console.log(this.array_of_functions);
                break;
                case 7:
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
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name: "setXPos", backgroundImg:this.backgroundImg};
            return obj;
        },

        setYPos: function(yPosition){
            this.set('yPos',yPosition);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name: "setYPos",backgroundImg:this.backgroundImg};
            return obj;
        },

        changeCostume: function(link){
            this.set('costume',link);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name:"changeCostume",backgroundImg:this.backgroundImg};
            return obj;
        },

        changeBackground: function(link){
            this.set('backgroundImg',link);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name:"changeBackground",backgroundImg:this.backgroundImg};
            return obj;
        },

        show: function(){
            this.set('isShown',true);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name:"show",backgroundImg:this.backgroundImg};
            return obj;
        },

        hide: function(){
            this.set('isShown',false);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name:"hide",backgroundImg:this.backgroundImg};
            return obj;
        },

        move: function(steps){
            this.set('xPos',xPos+steps);
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name:"move",backgroundImg:this.backgroundImg};
            return obj;
        },

        repeat: function(commands, iterations){
            var obj = {xPos: this.xPos, yPos: this.yPos, isShown: this.isShown, costume: this.costume, name:"repeat",backgroundImg:this.backgroundImg};
            return obj;
        },


    });

})();
