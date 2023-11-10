import { create_ork } from "../orks";
import { create_chest } from "../chests";
import { create_mage } from "../mages";
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
        var worldComponent = this; // Store a reference to the world component
        this.chestCollectedFlag = false; // Flag to check if the chest has been collected

        //here gets defined how log the game goes
        // 30 seconds are 30 * 1000 ms
        this.el.setAttribute("world", "gametime" ,30.0 * 1000)

        //Sart the timer
        this.el.setAttribute("world", "timer_ongoing", true)

        this.el.addEventListener("mousedown", this.reset_game.bind(this))

        this.el.addEventListener("chestCollected", function () {
                worldComponent.chestCollectedFlag = true;
                //var storedTimeDelta = this.currentTimedelta || 0;
                //console.log("Timedelta:", storedTimeDelta);
                //worldEl.setAttribute("world", "gametime", storedTimeDelta);
        });




        const result = this.generateRandomPosition(6);

        this.spawn_orks(result[2], result[3],result[4],result[5])
        this.spawn_chests(result[0])
        this.spawn_mages(result[1])
        this.hide_chestpopup()
        this.hide_magepopup()

    },

    spawn_orks : function (number1, number2, number3, number4) {

        var orks = document.getElementById('orks')


        // spawns the orks
        holePositions.forEach(function(pos, index){
            if (index === number1 || index % 6 === number2 || index % 6 === number3|| index % 6 === number4) {
                var ork = create_ork(pos) //6
                orks.appendChild(ork)
            }
        })

        let hammer = document.getElementById("player-hammer")
        //hammer.emit("orks_spawned")
        hammer.emit("orks_spawned")

    }.bind(this),

    spawn_chests : function (number1) {

        var chests = document.getElementById('chests')

        holePositions.forEach(function(pos, index){
            if (index === number1) {
                var chest = create_chest(pos);
                chests.appendChild(chest);
            }
        });


        let hammer = document.getElementById("player-hammer")
        hammer.emit("chests_spawned")

    }.bind(this),

    spawn_mages : function (number1) {

        var mages = document.getElementById('mages')

        holePositions.forEach(function(pos, index){
            if (index === number1) {
                var mage = create_mage(pos);
                mages.appendChild(mage);
            }
        });


        let hammer = document.getElementById("player-hammer")
        hammer.emit("mages_spawned")

    }.bind(this),

    generateRandomPosition : function (length) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(i);
    }

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result
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
                if (this.chestCollectedFlag) {

                    this.el.setAttribute("world", "gametime", update_gametime +5.0 * 1000 ) //CHEST BOOST
                    this.chestCollectedFlag = false;
                }
            }else{
                this.el.setAttribute("world", "timer_ongoing" ,false)
            }
        }


        // var orks = document.querySelectorAll('.ork')
        var orks = document.querySelectorAll('.ork')
        var chests = document.querySelectorAll('.chest') //!!!!!!!!!!!!!
        var mages = document.querySelectorAll('.mage') //!!!!!!!!!!!!!

        if(orks.length <= 0 && timer_ongoing){
            this.time += timeDelta;

            //here will the new spanning after all 6 were hit start
            if(this.time >= 1000){
                const result = this.generateRandomPosition(6);
                this.spawn_orks(result[2], result[3],result[4],result[5])
                this.spawn_chests(result[0])
                this.spawn_mages(result[1])
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

        var mage_container = document.getElementById("mages")
        var mages = document.querySelectorAll('.mage')

        mages.forEach(function (mage) {
            mage_container.removeChild(mage)
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

    hide_magepopup: function ( ) {
        let wintetx = document.getElementById("mage-text")
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
