<template>
    <div id="app">
        <template v-if="this.$route.meta.showMenu">
            <app-main></app-main>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>

    </div>
</template>
<script>
    import AppMain from "./components/menu/AppMain";

    export default {
        components: {AppMain}
    }
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        /*margin-top: 10px;*/
        height: 100%;
        width: 100%;
    }
</style>

