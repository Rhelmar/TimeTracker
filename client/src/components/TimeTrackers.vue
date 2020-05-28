<template>
<div>
    <div class="widgets-container">
        <TimeTracker v-for="timeTracker in timeTrackers" v-bind:key="timeTracker._id"
            v-bind:timeTracker="timeTracker" 
            v-on:startCounter="startCounter" 
            v-on:pauseCounter="pauseCounter"
            v-on:resetCounter="resetCounter"
            v-on:deleteTracker="deleteTracker"
        />
        <DummyTracker v-on:submit="submit" v-on:cancel="cancel" v-if="newTracker" />
        <AddTracker v-on:addTracker="addTracker" v-bind:newTracker="newTracker" />
    </div>
</div>
</template>

<script>
import TimeTracker from './TimeTracker';
import AddTracker from './AddTracker';
import DummyTracker from './DummyTracker';
import APIService from '../APIService';

export default {
    name: 'TimeTrackers',
    components: { 
        TimeTracker,
        AddTracker,
        DummyTracker
    },
    data() {
        return {
            timeTrackers: null,
            newTracker: false
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
        pauseCounter(id, timePaused, timePassed) {
            const tracker = this.timeTrackers.filter(timeTracker => timeTracker.id == id)[0];
            tracker.timePaused = timePaused;
            tracker.oldTimePassed = timePassed;
            tracker.isRunning = false;
            tracker.timeStarted = null;
            APIService.updateTracker(tracker);
        },
        resetCounter(id) {
            const tracker = this.timeTrackers.filter(timeTracker => timeTracker.id == id)[0];
            tracker.timeStarted = null;
            tracker.timePaused = null;
            tracker.isRunning = false;
            tracker.oldTimePassed = null;
            APIService.updateTracker(tracker);
        },
        addTracker() {
            this.newTracker = true;
        },
        async submit(name) {
            const tracker = {
                name: name,
                timeStarted: null,
                timePaused: null,
                timePassed: null,
                isRunning: false,
                oldTimePassed: null
            }
            const trackers = await APIService.addTracker(tracker);
            this.timeTrackers = trackers.data;
            this.newTracker = false;
        },
        cancel() {
            this.newTracker = false;
        },
        async deleteTracker(id) {
            const tracker = this.timeTrackers.filter(timeTracker => timeTracker.id == id)[0];
            const trackers = await APIService.deleteTracker(tracker.id);
            this.timeTrackers = trackers.data;
        }
    },
    async created() {
        this.timeTrackers = await APIService.getTrackers();
    }
}
</script>

<style lang="less" scoped>
.widgets-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10em, 20em));
    grid-auto-rows: minmax(15em, auto);
    gap: 1em;
}
</style>