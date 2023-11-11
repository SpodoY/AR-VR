AFRAME.registerComponent('chest-logic', {
    schema: {

    },

    init: function () {
        this.time = 0;
        this.randomInterval = Math.floor(Math.random() * Math.floor(300))  + 1000
        this.can_die = true;

        this.el.addEventListener(
            "switch",
            function () {
                let visible = this.el.getAttribute("visible")
                this.el.setAttribute("visible", !visible)
            }.bind(this))


        var hammerhit = function (){
            let chests = document.getElementById('chests')

            if(this.can_die === true) {
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


        this.el.addEventListener( "mousedown", hammerhit)
        //this.el.addEventListener( "click", hammerhit) -> just hover over and it is hitting

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

    show_chestpopup : function ( ) {
        let wintetx = document.getElementById("chest-text")
        let visible = wintetx.getAttribute("visible")

        if(!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    show_chestpopup2 : function ( ) {
        let wintetx = document.getElementById("chest-text2")
        let visible = wintetx.getAttribute("visible")

        if(!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    hide_chestpopup: function ( ) {
        let wintetx = document.getElementById("chest-text")
        let visible = wintetx.getAttribute("visible")

        if(visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),

    hide_chestpopup2: function ( ) {
        let wintetx = document.getElementById("chest-text2")
        let visible = wintetx.getAttribute("visible")

        if(visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),

    tick: function (time, timeDelta) {

        // make time evry tick faster basic game logic
        this.time += timeDelta

        //if the time is over our random time spawn
        if(this.time >= this.randomInterval){
            this.el.emit("switch")
            this.time =0
        }

    }
});
