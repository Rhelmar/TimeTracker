<template>
  <div class="widget-container">
      <input class="name" type="text" v-model="name" >
      <div class="container">
          <div class="accept" @click="submit">
              <span class="content">&#10003;</span>
          </div>
          <div class="cancel" @click="cancel">
              <span class="content">&#10005;</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DummyTracker',
    data(){
        return {
            name: ''
        }
    },
    methods: {
        submit() {
            if(this.name == '') {
                this.$toasted.show('Name must not be empty', {
                    duration: 3000
                })
                return;
            }
            this.$emit('submit', this.name);
        },
        cancel() {
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="less" scoped>
.widget-container {
    background-color: #222;
    box-shadow: 0 8px 8px 0;
    position: relative;
}
.name {
    border: none;
    background-color: #777;
    color: white;
    margin: 1rem;
    padding: 1rem 0 1rem 1rem;
    font-size: 1.1em;
}

.container {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
}

.button {
    cursor: pointer;
    display: table;
    padding: 1em;
}

.content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.accept:extend(.button) {
    background-color: #00ff00;
    margin: 0 0 1em 1em;
    &:hover {
        background-color: lighten(#00ff00, 15%)
    }
}

.cancel:extend(.button) {
    background-color: #ff0000;    
    margin: 0 1em 1em 0;
    &:hover {
        background-color: lighten(#ff0000, 15%)
    }
}
</style>