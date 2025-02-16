<template>
  <div class="TodoMain">
    <main class="main-container">
      <section class="meos-section" id="meos-section">
        <!-- 表单区域 -->
        <div class="input-container" id="input-container">
          <form class="input-form" @submit.prevent="onSubmit">
            <input
              type="text"
              class="formcontrol"
              placeholder="消费名称"
              @keyup.enter="onSubmit"
              v-model.trim="localName"
            />
            <input
              type="text"
              class="formcontrol"
              placeholder="消费价格"
              v-model.number="localPrice"
            />
            <button class="btn-primary btn">添加账单</button>
          </form>
        </div>
        <!-- 表格展示账单列表 -->
        <div class="meos-container" id="meos-container">
          <table>
            <thead>
              <tr>
                <th>编号</th>
                <th>消费名称</th>
                <th>消费价格</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price.toFixed(2) }}</td>
                <td>
                  <a @click="handleDel(item.id)" href="javascript:;">删除</a>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>消费总计：{{ totalPrice }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- 图表区域 -->
        <div
          class="echarts-box"
          ref="chart"
          style="width: 800px; height: 400px"
        ></div>
      </section>
    </main>
  </div>
</template>

<script>
// 注意确保正确导入 echarts
import * as echarts from "echarts";

export default {
  name: "TodoMain",
  props: {
    // 父组件传递过来的账单数据
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 局部状态，用于表单输入（不直接使用父组件数据，避免双向绑定问题）
      localName: "",
      localPrice: "",
    };
  },
  computed: {
    // 计算总消费金额
    totalPrice() {
      return this.list.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    // 表单提交时，通知父组件添加新账单
    onSubmit() {
      this.$emit("add-list", { name: this.localName, price: this.localPrice });
      // 重置输入框
      this.localName = "";
      this.localPrice = "";
    },
    // 删除按钮点击时，通知父组件删除指定账单
    handleDel(id) {
      this.$emit("del", id);
    },
    // 初始化 echarts 图表
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      const option = {
        title: {
          text: "消费账单列表",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "left",
          top: "top",
          orient: "vertical",
          textStyle: {
            fontSize: 12,
            color: "#333",
          },
          itemWidth: 14,
          itemHeight: 14,
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "消费账单",
            type: "pie",
            radius: [20, 140],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: [], // 初始为空，待后续更新
          },
        ],
      };
      this.chart.setOption(option);
    },
    // 根据 list 数据更新图表
    updateChart() {
      if (this.chart) {
        this.chart.setOption({
          series: [
            {
              data: this.list.map((item) => ({
                value: item.price,
                name: item.name,
              })),
            },
          ],
        });
      }
    },
  },
  mounted() {
    this.initChart();
  },
  watch: {
    // 监听 list 数据变化，更新图表
    list: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* TodoMain 的样式 */
</style>
