import {createPostion} from "../holes";

AFRAME.registerComponent('ork-logic', {
    schema: {},

    init: function () {
        this.time = 0;
        //this.randomInterval = Math.floor(Math.random() * Math.floor(300))  + 1000
        this.randomInterval = 990;
        this.randomInterval2 = 1010;
        this.can_die = true;

        // Access the shared entity
        this.sharedEntity = document.getElementById('shared-entity');
        this.currentPositionIndex = this.sharedEntity.getAttribute('data-current-position-index');


        var orkId = this.el.components['ork-logic'].data.id; // Access the ID of the ork
        //console.log("ID: " + orkId);

        if (orkId === "ork_0") {
            this.currentPositionIndex++;
            this.currentPositionIndex++;

        } else if (orkId === "ork_1") {
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
        } else if (orkId === "ork_2") {
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
        } else if (orkId === "ork_3") {
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
            this.currentPositionIndex++;
        }

        this.el.addEventListener(
            "switch",
            function () {
                let visible = this.el.getAttribute("visible")
                this.el.setAttribute("visible", !visible)
            }.bind(this))


        var hammerhit = function () {
            let orks = document.getElementById('orks')

            if (this.can_die === true) {
                orks.removeChild(this.el)

                AFRAME.scenes[0].emit('increaseScore', {points: 1})
            }

            let hammer = document.getElementById('player-hammer')
            hammer.emit('hit')

        }.bind(this)

        this.el.addEventListener("mousedown", hammerhit)
        //this.el.addEventListener( "click", hammerhit) -> just hover over and it is hitting

        this.el.addEventListener("candie", function () {
            this.can_die = true
        }.bind(this))


        this.el.addEventListener("dontdie", function () {
            this.can_die = false
        }.bind(this))
    },

    update: function () {
        // Do something when component's data is updated.
    },

    remove: function () {
        // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {

        // make time evry tick faster basic game logic
        this.time += timeDelta


        if (this.currentPositionIndex % 2 === 0) {

            if (this.time >= Math.floor(Math.random() * (1200 - 800 + 1)) + 800) {
                this.el.emit("switch")
                var pos;
                console.log(this.currentPositionIndex + "ORK")


                if (this.currentPositionIndex % 12 === 0) {
                    pos = createPostion(2, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 2) {
                    pos = createPostion(-2.2, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 4) {
                    pos = createPostion(0, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 6) {
                    pos = createPostion(2, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 8) {
                    pos = createPostion(0, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 10) {
                    pos = createPostion(-2.2, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }

                this.time = 0
                this.currentPositionIndex++;
            }
        } else {
            if (this.time >= Math.floor(Math.random() * (1200 - 800 + 1)) + 800) {
                this.el.emit("switch")
                var pos;
                // console.log(this.currentPositionIndex + "MAGEEEEEE")
                if (this.currentPositionIndex % 12 === 0) {
                    pos = createPostion(2, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 2) {
                    pos = createPostion(-2.2, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 4) {
                    pos = createPostion(0, -0.2, 1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 6) {
                    pos = createPostion(2, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 8) {
                    pos = createPostion(0, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }
                if (this.currentPositionIndex % 12 === 10) {
                    pos = createPostion(-2.2, -0.2, -1.2)
                    this.el.setAttribute("position", pos)
                }


                this.time = 0
                this.currentPositionIndex++;
            }

        }
    }
});
