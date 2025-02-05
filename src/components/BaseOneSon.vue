<template>
  <div class="BaseOneSon">
    <div class="SonText">son组件接受父组件数据为:{{ title }}</div>
    <input
      type="text"
      class="changeTitle"
      v-model="newTitle"
      placeholder="请输入新的标题"
    />
    <button @click="changeFn">修改Title</button>
    <div class="userInfo">
      <h3>个人信息组件</h3>
      <div>姓名: {{ data.usrname }}</div>
      <div>年纪: {{ data.age }}</div>
      <div>是否单身: {{ data.isSingel }}</div>
      <div>座驾: {{ data.car.brand }}</div>
      <div>兴趣爱好: {{ data.hobby }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseOneSon",
  // props: ["title"],
  props: {
    title: {
      type: String, //Number
      required: true, //非空
      default: "Default title",
      validator(value) {
        console.log(value);
        //实现判断逻辑
        return true;
      },
    },
    data: Object,
  },
  data() {
    return {
      newTitle: "",
    };
  },
  created() {},
  computed: {},
  methods: {
    changeFn() {
      //事件名和父组件相同
      this.$emit("changeTitle", this.newTitle);
    },
  },
};
</script>
<style lang="scss" scoped>
.BaseOneSon {
  text-align: center;
  margin-top: 60px;
}
.SonText {
  margin: 10px;
}
.changeTitle {
  margin: 0 5px;
}
.userInfo {
  border: 3px solid #333;
  margin: 10px;
  padding-bottom: 10px;
}
</style>
