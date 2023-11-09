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

            if(this.can_die === true){
                chests.removeChild(this.el)

                AFRAME.scenes[0].emit('increaseScore', {points : 1})
            }

            let hammer = document.getElementById('player-hammer')
            hammer.emit('hit')

        }.bind(this)

        this.el.addEventListener( "mousedown", hammerhit)
        this.el.addEventListener( "click", hammerhit)

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
