<template>
  <div class="BaseOne">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button @click="count++">+</button>
    <!-- 父组件进行消息监听 -->
    <BaseOneSon :data="parentData" @changeTitle="handleChange"></BaseOneSon>
  </div>
</template>
<script>
import BaseOneSon from "./BaseOneSon.vue";

export default {
  components: {
    BaseOneSon,
  },
  data() {
    return {
      count: 180,
      parentData: {
        myTitle: "title1",
        usrname: "name1",
        age: 19,
        isSingel: true,
        car: {
          brand: "奔奔",
        },
        hobby: ["篮球", "游泳", "跑步"],
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    handleChange(newtitle) {
      this.myTitle = newtitle;
    },
  },
};
</script>
<style lang="scss" scoped>
.BaseOne {
  text-align: center;
}
</style>
