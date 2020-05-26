<template>
    <div class="container">
        <div class="grid-container">
            <input class="name" type="text" v-model=timeTracker.name>
            <div class="delete">
                <span class="content">X</span>
            </div>
            <div class="time">{{ `${hours}:${minutes}:${seconds}` }}</div>
        </div>
        <div class="buttons">
            <div class="start" @click="startCounter">Start</div>
            <div class="pause" @click="pauseCounter">Pause</div>
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
            oldTimePassed: this.timeTracker.timePassed,
            continueRunning: false,
            isAlreadyRunning: false,
            interval: null
        }
    },
    mounted(){
        if(this.timeTracker.isRunning || this.timeTracker.timePaused != null){
            this.continueRunning = true;
            this.startCounter();
        }
    },
    methods: {
        startCounter(){
            if(!this.isAlreadyRunning){
                if(this.continueRunning){
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
                self.timeTracker.timePassed = new Date() - Date.parse(self.timeTracker.timeStarted);
                let seconds = Math.floor(self.timeTracker.timePassed / 1000);
                let minutes = 0;
                let hours = 0;
                if(seconds > 59){
                    seconds = 0;
                    minutes = seconds / 60;
                    if(minutes > 59){
                        minutes = 0;
                        hours = minutes / 60;
                    }
                }

                self.hours = hours < 10 ? `0${hours}` : hours;
                self.minutes = minutes < 10 ? `0${minutes}` : minutes;
                self.seconds = seconds < 10 ? `0${seconds}` : seconds;
            }, 1000)
        },
        pauseCounter(){
            this.timeTracker.timePaused = new Date();
            this.$emit('pauseCounter', this.timeTracker.id, this.timeTracker.timePaused);
            this.isAlreadyRunning = false;
            clearInterval(this.interval);
        },

        resetCounter(){
            this.$emit('resetCounter', this.timeTracker.id);
            this.isAlreadyRunning = false;
            clearInterval(this.interval);
            this.hours = "00";
            this.minutes = "00";
            this.seconds = "00";
        },
    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: #333;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.name {
    border: none;
    background-color: #777;
    color: white;
    grid-column: ~"1 / span 10";
    margin: 1em;
    padding: 1em 0 1em 1em;
}
.delete:extend(.button) {
    background-color: #ff0000;
    color: white;
    grid-column: ~"span 1 / -1";
    margin: 1em 1em 1em 0;
    display: table;
    padding: 0 1em 0 1em;
}

.content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.time {
    color: white;
    grid-row: 2;
    place-self: center;
    grid-column: ~"7 / span 2";
    font-size: 1.5em;
}

.buttons {
    display: flex;
    align-content: center;
    justify-content: center;
}

.button {
    padding: 1em;
    margin: 1em;
    cursor: pointer;
}

.setColor(@color) {
    background-color: @color;
    &:hover {
        background-color: lighten(@color, 10%);
    }
}

@start: green;
@pause: #ffed00;
@reset: #fa0000;

.start:extend(.button) {
    .setColor(@start)
}

.pause:extend(.button) {
    .setColor(@pause)
}

.reset:extend(.button) {
   .setColor(@reset)
}
</style>