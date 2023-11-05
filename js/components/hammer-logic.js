AFRAME.registerComponent('hammer-logic', {
    schema: {
        
    },

    init: function () {
        let orks = []

        this.el.addEventListener("orks_spawned", function () {
           orks =Array.prototype.slice.call(document.querySelectorAll(".orks"))
        })

        //here we start the animation so we have to ensure that during it no other ork is killable
        this.el.addEventListener("animationstart", function() {
            orks.map(function (ork) {
                ork.emit("dontdie")
            })
        }
        )

        //here we know the animation is over so we kill new ork's 
        this.el.addEventListener("animationend", function() {
            orks.map(function (ork) {
                ork.emit("candie")
            })
        }
        )

      // Do something when component first attached.
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    },
});
