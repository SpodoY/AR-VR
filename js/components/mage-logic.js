import {createPostion} from "../holes";

AFRAME.registerComponent('mage-logic', {
    schema: {

    },

    init: function () {
        this.time = 0;
        //this.randomInterval = Math.floor(Math.random() * Math.floor(300))  + 1000
        this.randomInterval = 1040;
        this.randomInterval2 = 960;
        this.can_die = true;

        // Access the shared entity
        this.sharedEntity = document.getElementById('shared-entity');

        // Access the value
        this.currentPositionIndex = this.sharedEntity.getAttribute('data-current-position-index');
        this.currentPositionIndex++;
        this.currentPositionIndex++;
        this.currentPositionIndex++;
        this.currentPositionIndex++;

        this.myArray = JSON.parse(this.sharedEntity.getAttribute('data-my-array'));
        console.log(this.myArray);

        this.el.addEventListener(
            "switch",
            function () {
                let visible = this.el.getAttribute("visible")
                this.el.setAttribute("visible", !visible)
            }.bind(this))


        var hammerhit = function (){
            let chests = document.getElementById('mages')

            if(this.can_die === true){
                chests.removeChild(this.el)

                AFRAME.scenes[0].emit('decreaseScore', {points : 1})
                this.show_magepopup(); // -> ACTION BAD
                setTimeout(() => {
                    this.hide_magepopup();
                }, 1500);
            }

            let hammer = document.getElementById('player-hammer')
            hammer.emit('hit')

        }.bind(this)


        this.el.addEventListener( "mousedown", hammerhit)
        // this.el.addEventListener( "click", hammerhit) -> just hover over and it is hitting

        this.el.addEventListener( "candie", function () {
            this.can_die = true
        }.bind(this))


        this.el.addEventListener( "dontdie", function () {
            this.can_die = false
        }.bind(this))
    },

    update: function () {
        // Do something when component's data is updated.
    },

    remove: function () {
        // Do something the component or its entity is detached.
    },

    show_magepopup : function ( ) {
        let wintetx = document.getElementById("mage-text")
        let visible = wintetx.getAttribute("visible")

        if(!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    hide_magepopup: function ( ) {
        let wintetx = document.getElementById("mage-text")
        let visible = wintetx.getAttribute("visible")

        if(visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),


    tick: function (time, timeDelta) {

        // make time evry tick faster basic game logic
        this.time += timeDelta

        //if the time is over our random time spawn
        if(this.currentPositionIndex%2===0) {
            if (this.time >= Math.floor(Math.random() * (1200 - 800 + 1)) + 800) {
                this.el.emit("switch")
                var pos;

                if (this.currentPositionIndex % 12 === this.myArray[0]) {
                    pos = createPostion(2, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === this.myArray[1]) {
                    pos = createPostion(-2.2, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === this.myArray[2]) {
                    pos = createPostion(0, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === this.myArray[3]) {
                    pos = createPostion(2, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === this.myArray[4]) {
                    pos = createPostion(0, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === this.myArray[5]) {
                    pos = createPostion(-2.2, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }


                this.time = 0
                this.currentPositionIndex++;
            } }else {
                if (this.time >= Math.floor(Math.random() * (1200 - 800 + 1)) + 800) {
                    this.el.emit("switch")
                    var pos;
                    // console.log(this.currentPositionIndex + "MAGEEEEEE")
                    if (this.currentPositionIndex % 12 === this.myArray[0]) {
                        pos = createPostion(2, -0.2, 1.2)
                        this.el.setAttribute("position", pos)
                    }
                    if (this.currentPositionIndex % 12 === this.myArray[1]) {
                        pos = createPostion(-2.2, -0.2, 1.2)
                        this.el.setAttribute("position", pos)
                    }
                    if (this.currentPositionIndex % 12 === this.myArray[2]) {
                        pos = createPostion(0, -0.2, 1.2)
                        this.el.setAttribute("position", pos)
                    }
                    if (this.currentPositionIndex % 12 === this.myArray[3]) {
                        pos = createPostion(2, -0.2, -1.2)
                        this.el.setAttribute("position", pos)
                    }
                    if (this.currentPositionIndex % 12 === this.myArray[4]) {
                        pos = createPostion(0, -0.2, -1.2)
                        this.el.setAttribute("position", pos)
                    }
                    if (this.currentPositionIndex % 12 === this.myArray[5]) {
                        pos = createPostion(-2.2, -0.2, -1.2)
                        this.el.setAttribute("position", pos)
                    }


                    this.time = 0
                    this.currentPositionIndex++;
                }
            }

        }
});
