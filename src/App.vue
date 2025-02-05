<template>
  <div id="app">
    <BaseOne></BaseOne>
  </div>
</template>

<script>
import BaseOne from "./components/BaseOne.vue";

export default {
  name: "App",
  components: {
    BaseOne,
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
