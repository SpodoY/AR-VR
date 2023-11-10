import { create_ork } from "../orks";
import { create_chest } from "../chests";
import { holePositions } from "../holes";

AFRAME.registerComponent('world', {
    schema: {
        gametime : {
            type : "float",
            default : 0.0
        },
        timer_ongoing : {
            type : "boolean",
            default : true
        }
    },

    init: function () {
        this.time = 0

        //here gets defined how log the game goes 
        // 30 seconds are 30 * 1000 ms
        this.el.setAttribute("world", "gametime" ,30.0 * 1000)

        //Sart the timer
        this.el.setAttribute("world", "timer_omgoing", true)

        this.el.addEventListener("mousedown", this.reset_game.bind(this) )

        this.spawn_orks() //HERE
        this.spawn_chests()
        this.hide_chestpopup()

    },

    spawn_orks : function () {
        
        //gets over Entity of the orks 
       // var orks = document.getElementById('orks')
        var orks = document.getElementById('orks')


        // spawns the orks
        holePositions.forEach(function(pos, index){
                if (index % 2 !== 1) {
                    var ork = create_ork(pos) //6
                    orks.appendChild(ork)
                }
        })

        let hammer = document.getElementById("player-hammer")
        //hammer.emit("orks_spawned")
        hammer.emit("orks_spawned")

    }.bind(this),

    spawn_chests : function () {

        var chests = document.getElementById('chests')

        holePositions.forEach(function(pos, index){
            if (index % 2 !== 0) { // Check if the index is odd
                var chest = create_chest(pos);
                chests.appendChild(chest);
            }
        });


        let hammer = document.getElementById("player-hammer")
        hammer.emit("chests_spawned")

    }.bind(this),

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {

      let {gametime, timer_ongoing }=  this.el.getAttribute("world") 
      let update_gametime = gametime - timeDelta
      
      if(timer_ongoing){
          if(Math.ceil(update_gametime / 1000 >= 0)){
              this.el.setAttribute("world", "gametime", update_gametime)
          }else{
              this.el.setAttribute("world", "timer_ongoing" ,false)
          }
      }


     // var orks = document.querySelectorAll('.ork')
        var orks = document.querySelectorAll('.ork')
        var chests = document.querySelectorAll('.chest') //!!!!!!!!!!!!!

      if(orks.length <= 0 && timer_ongoing){
        this.time += timeDelta;

        //here will the new spanning after all 6 were hit start
        if(this.time >= 1000){
            this.spawn_orks()
        }
      }

     if( timer_ongoing === false){
        this.kill_orks()
        this.show_wintext()
     }else{
        this.hide_wintext()
     }

    },

    kill_orks : function ( ) {
        //var ork_container = document.getElementById("orks")
        //var orks = document.querySelectorAll('.ork')

        var chest_container = document.getElementById("chests")
        var chests = document.querySelectorAll('.chest')

        chests.forEach(function (chest) {
            chest_container.removeChild(chest)
        })

        var ork_container = document.getElementById("orks")
        var orks = document.querySelectorAll('.ork')

        orks.forEach(function (ork) {
            ork_container.removeChild(ork)
        })


    }.bind(this),

    show_wintext : function ( ) {
        let wintetx = document.getElementById("winning-text")
        let visible = wintetx.getAttribute("visible")

        if(!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    show_chestpopup : function ( ) {
        let wintetx = document.getElementById("chest-text")
        let visible = wintetx.getAttribute("visible")

        if(!visible) {
            wintetx.setAttribute("visible", true)
        }

    }.bind(this),

    hide_wintext : function ( ) {
        let wintetx = document.getElementById("winning-text")
        let visible = wintetx.getAttribute("visible")

        if(visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),

    hide_chestpopup: function ( ) {
        let wintetx = document.getElementById("chest-text")
        let visible = wintetx.getAttribute("visible")

        if(visible) {
            wintetx.setAttribute("visible", false)
        }
    }.bind(this),

    reset_game : function () {
        let { timer_ongoing }=  this.el.getAttribute("world") 
        if(timer_ongoing === false){
            this.kill_orks()
            AFRAME.scenes[0].emit("resetScore", {})
            location.reload()
        }
    }
});
