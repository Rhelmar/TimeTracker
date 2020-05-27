<template>
  <div id="app">
    <TimeTrackers id="timeTrackers" />
  </div>
</template>

<script>
import TimeTrackers from './components/TimeTrackers';

export default {
  name: 'App',
  components: {
    TimeTrackers
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}

#app {
  background-color: #444;
  height: 100vh;
  padding: 1em;
}
</style>
