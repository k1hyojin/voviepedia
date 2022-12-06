<template>
<div id="app">
    <Header />
    <Menu />
    <div>
    <router-view></router-view>
    </div>
</div>
</template>
<script>
import Header from "../src/components/TheHeader.vue"
import Menu from "../src/components/TheMenu.vue"
export default {
    components :{
      Header,
      Menu,
    }
}
</script>
<style>

</style>
