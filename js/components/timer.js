AFRAME.registerComponent('timer-view', {
    schema: {
        
    },

    init: function () {
      this.el.setAttribute('text', "value", "hello world")
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      
        let world = document.querySelector("a-scene")
        let {gametime, timer_ongoing }= world.getAttribute("world") 

        let pretty_time =  Math.ceil(gametime / 1000)

        if(timer_ongoing){
            this.el.setAttribute("text", "value" , pretty_time)
        }else{
            this.el.setAttribute("text", "value", "timer ended")
        }

    }
});
