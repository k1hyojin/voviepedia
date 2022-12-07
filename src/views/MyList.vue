<template>
  <h1>My Page</h1>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // const arr = [];
    if (localStorage.length > 0) {
      // for (let i = 0; i > localStorage.length; i++) {
      //   // arr.push(localStorage.getItem(id))
      //   // arr.push(JSON.parse(localStorage.getItem((localStorage.key(i)))));

      // }
      console.log(JSON.parse(localStorage.getItem("store")));
    }
  },
};
</script>

<style>
</style>