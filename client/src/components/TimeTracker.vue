<template>
    <div class="widget-container">
        <div class="container">
            <input class="name" type="text" v-model=timeTracker.name>
            <div class="delete" @click="deleteTracker">
                <span class="content">&#10005;</span>
            </div>
        </div>
        <div class="time">{{ `${hours}:${minutes}:${seconds}` }}</div>
        <div class="buttons">
            <div v-bind:class="getClass()" @click="startPause">{{StartPauseText}}</div>
            <div class="reset" @click="resetCounter">Reset</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TimeTracker',
    props: ['timeTracker'],
    data () {
        return {
            seconds: "00",
            minutes: "00",
            hours: "00",
            continueRunning: false,
            isAlreadyRunning: false,
            interval: null,
            StartPauseText: null
        }
    },
    mounted(){
        if(this.timeTracker.timePaused != null){
            this.StartPauseText = "Start";
            this.setDisplayTime();
        }
        else if(this.timeTracker.isRunning){
            this.continueRunning = true;
            this.startCounter();
        }
        else {
            this.StartPauseText = "Start";
        }
    },
    methods: {
        getClass() {
            return {
                'pause': this.timeTracker.isRunning,
                'start': !this.timeTracker.isRunning
            }
        },
        startPause() {
            this.timeTracker.isRunning ? this.pauseCounter() : this.startCounter();
        },
        startCounter(){
            if(!this.isAlreadyRunning){
                this.StartPauseText = "Pause";
                if(this.continueRunning){
                    this.continueRunning = false;
                    this.updateCounter();
                } else {
                    this.timeTracker.timeStarted = new Date();
                    this.updateCounter();
                }
                this.$emit('startCounter', this.timeTracker.id, this.timeTracker.timeStarted);
                this.isAlreadyRunning = true;
            } else {
                this.$toasted.show('Already Running', {
                    duration: 3000
                })
            }
        },
        updateCounter(){
            const self = this;
            this.interval = setInterval(() => {
                if(self.timeTracker.oldTimePassed != null && self.timeTracker.oldTimePassed != 'NaN'){
                    self.timeTracker.timePassed = (Date.parse(new Date()) + self.timeTracker.oldTimePassed) - Date.parse(self.timeTracker.timeStarted);
                } else {
                    self.timeTracker.timePassed = new Date() - Date.parse(self.timeTracker.timeStarted);
                }
                self.setDisplayTime();
            }, 1000)
        },
        setDisplayTime(){
            let ticks = Math.floor(this.timeTracker.timePassed);

            const secondsUnit = 1000;
            const minutesUnit = secondsUnit * 60;
            const hoursUnit = minutesUnit * 60;

            const hours = Math.floor(ticks / hoursUnit);
            const minutes =  Math.floor((ticks % hoursUnit) / minutesUnit);
            const seconds  =  Math.floor((ticks % minutesUnit) / secondsUnit);
            
            this.hours = hours < 10 ? `0${hours}` : hours;
            this.minutes = minutes < 10 ? `0${minutes}` : minutes;
            this.seconds = seconds < 10 ? `0${seconds}` : seconds;
        },
        pauseCounter(){
            this.timeTracker.timePaused = new Date();
            this.$emit('pauseCounter', this.timeTracker.id, this.timeTracker.timePaused, this.timeTracker.timePassed)
            this.isAlreadyRunning = false;
            clearInterval(this.interval);
            this.StartPauseText = "Start";
        },

        resetCounter(){
            this.$emit('resetCounter', this.timeTracker.id);
            this.isAlreadyRunning = false;
            this.continueRunning = false;
            clearInterval(this.interval);
            this.hours = "00";
            this.minutes = "00";
            this.seconds = "00";
            this.StartPauseText = "Start";
        },
        deleteTracker(){
            this.$emit('deleteTracker', this.timeTracker.id);
        }
    }
}
</script>

<style lang="less" scoped>
@start: #00ff00;
@pause: #ffed00;
@red: #ff0000;

.widget-container {
    background-color: #222;
    box-shadow: 0 8px 8px 0;
}

.container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}

.name {
    border: none;
    background-color: #777;
    color: white;
    grid-column: ~"1 / span 10";
    margin: 1rem;
    padding: 1rem 0 1rem 1rem;
    font-size: 1.1em;
}
.delete:extend(.button) {
    background-color: #ff0000;
    grid-column: ~"span 1 / -1";
    margin: 1em 1em 1em 0 !important;
    display: table;
    padding: 1.1em !important;
    .setColor(@red);
}

.content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.time {
    color: white;
    font-size: 1.5em;
    margin: 1em 0 1em 0;
    text-align: center;
}

.buttons {
    display: flex;
    align-content: center;
    justify-content: space-between;
}

.button {
    padding: 1em;
    cursor: pointer;
    flex-shrink: 1;
}

.setColor(@color) {
    background-color: @color;
    &:hover {
        background-color: lighten(@color, 15%);
    }
}

.start:extend(.button) {
    .setColor(@start);
   margin: 0 0 1em 1em;
}

.pause:extend(.button) {
    .setColor(@pause);
    margin: 0 0 1em 1em;
}

.reset:extend(.button) {
   .setColor(@red);
   margin: 0 1em 1em 0;
}
</style>