import {createPostion} from "../holes";

AFRAME.registerComponent('chest-logic', {
    schema: {},

    init: function () {
        this.time = 0;
        //this.randomInterval = Math.floor(Math.random() * Math.floor(300))  + 1000
        this.randomInterval = 1020;
        this.randomInterval2 = 980;
        this.can_die = true;

        // Access the shared entity
        this.sharedEntity = document.getElementById('shared-entity');
        this.currentPositionIndex = this.sharedEntity.getAttribute('data-current-position-index');
        console.log(this.currentPositionIndex + "CHEST")

        this.el.addEventListener(
            "switch",
            function () {
                let visible = this.el.getAttribute("visible")
                this.el.setAttribute("visible", !visible)
            }.bind(this))


        var hammerhit = function () {
            let chests = document.getElementById('chests')

            if (this.can_die === true) {
                chests.removeChild(this.el)

                let randomInteger = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

                //SCORE BOOST
                if (randomInteger < 3) {
                    this.show_chestpopup2(); // -> ACTION
                    AFRAME.scenes[0].emit('increaseScore', {points: 3})
                    setTimeout(() => {
                        this.hide_chestpopup2();
                    }, 1500);
                } else {
                    this.show_chestpopup(); // -> ACTION
                    this.el.sceneEl.emit('chestCollected'); // Emit a custom event
                    setTimeout(() => {
                        this.hide_chestpopup();
                    }, 1500);
                }
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

    show_chestpopup: function () {
        let wintetx = document.getElementById("chest-text")
        let visible = wintetx.getAttribute("visible")

        if (!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    show_chestpopup2: function () {
        let wintetx = document.getElementById("chest-text2")
        let visible = wintetx.getAttribute("visible")

        if (!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    hide_chestpopup: function () {
        let wintetx = document.getElementById("chest-text")
        let visible = wintetx.getAttribute("visible")

        if (visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),

    hide_chestpopup2: function () {
        let wintetx = document.getElementById("chest-text2")
        let visible = wintetx.getAttribute("visible")

        if (visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),

    tick: function (time, timeDelta) {

        // make time evry tick faster basic game logic
        this.time += timeDelta

        if (this.currentPositionIndex % 2 === 0) {
            if (this.time >= Math.floor(Math.random() * (1200 - 800 + 1)) + 800) {
                this.el.emit("switch")
                var pos;

                //console.log(this.currentPositionIndex + "CHESSSST")
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


                this.currentPositionIndex++;
                this.time = 0
            }
        } else {
            if (this.time >= Math.floor(Math.random() * (1200 - 800 + 1)) + 800) {
                this.el.emit("switch")
                var pos;

                console.log(this.currentPositionIndex + "CHEST")

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
