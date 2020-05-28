<template>
<div class="widget-container" @click="addTracker">
    <span class="content">+</span>
</div>
</template>

<script>
export default {
    name: 'AddTracker',
    methods: {
        addTracker() {
            if(this.newTracker){
                this.$toasted.show('You have already created a new tracker', {
                    duration: 3000
                })
                return;
            }
            this.$emit('addTracker');
        }
    },
    props: ['newTracker'],
}
</script>

<style lang="less" scoped>
.widget-container {
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 8px 8px 0;
    &:hover {
        background-color: lighten(#222, 2%);
    }
    &:active {
        font-size: 1.25em;
    }
}

.content {
    font-size: 5em;
    color: #00ff00;
}
</style>