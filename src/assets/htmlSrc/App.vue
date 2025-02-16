<template>
  <div id="app">
    <!-- <BaseOne></BaseOne> -->
    <TodoHeader></TodoHeader>
    <TodoMain
      :list="list"
      @add-list="handleAddList"
      @del="handleDel"
    ></TodoMain>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
// import BaseOne from "./components/BaseOne.vue";
import TodoFooter from "./components/TodoFooter.vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoMain from "./components/TodoMain.vue";

import "./styles/index.css";

export default {
  name: "App",
  components: {
    TodoFooter,
    TodoHeader,
    TodoMain,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getList() {
      try {
        const res = await axios.get(
          "https://applet-base-api-t.itheima.net/bill",
          {
            params: { creator: "张三三三" },
          }
        );
        this.list = res.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async handleAddList({ name, price }) {
      if (!name || !price) {
        alert("请输入消费名称和价格！");
        return;
      }
      if (typeof price !== "number") {
        alert("价格请输入数字！");
        return;
      }
      try {
        await axios.post("https://applet-base-api-t.itheima.net/bill", {
          creator: "张三三三",
          name,
          price,
        });
        this.getList();
      } catch (error) {
        console.error(error);
      }
    },
    async handleDel(id) {
      try {
        await axios.delete(`https://applet-base-api-t.itheima.net/bill/${id}`);
        this.getList();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
