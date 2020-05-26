<template>
<div class="widget-container">
    <div v-for="timeTracker in timeTrackers" v-bind:key="timeTracker._id">
        <TimeTracker 
            v-bind:timeTracker="timeTracker" 
            v-on:startCounter="startCounter" 
            v-on:pauseCounter="pauseCounter"
            v-on:resetCounter="resetCounter"
        />
    </div>
</div>
</template>

<script>
import TimeTracker from './TimeTracker';
import APIService from '../APIService';

export default {
    name: 'TimeTrackers',
    components: { TimeTracker },
    data() {
        return {
            timeTrackers: null
        }
    },
    methods: {
        startCounter(id, timeStarted) {
            const tracker = this.timeTrackers.filter(timeTracker => timeTracker.id === id)[0];
            tracker.timePaused = null;
            tracker.timeStarted = timeStarted;
            tracker.isRunning = true;
            APIService.updateTracker(tracker);
        },
        pauseCounter(id, timePaused) {
            const tracker = this.timeTrackers.filter(timeTracker => timeTracker.id == id)[0];
            tracker.timePaused = timePaused;
            tracker.isRunning = false;
            tracker.timeStarted = null;
            APIService.updateTracker(tracker);
        },
        resetCounter(id) {
            const tracker = this.timeTrackers.filter(timeTracker => timeTracker.id == id)[0];
            tracker.timeStarted = null;
            tracker.timePaused = null;
            tracker.isRunning = false;
            APIService.updateTracker(tracker);
        }
    },
    async created() {
        this.timeTrackers = await APIService.getTrackers();
    }
}
</script>

<style lang="less" scoped>
.widget-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10em, 20em));
    gap: 1em;
}
</style>