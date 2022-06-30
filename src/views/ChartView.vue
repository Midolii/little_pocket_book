<template>
  <div class="echart">
    <div class="main_header">
      <el-select
        v-model="type.val"
        placeholder="筛选"
        popper-class="select_option"
      >
        <el-option label="查看本周" value="0" @click="toggleType(type.val)" />
        <el-option label="查看本月" value="1" @click="toggleType(type.val)" />
        <el-option label="查看今年" value="2" @click="toggleType(type.val)" />
      </el-select>
      <el-date-picker
        v-model="type.year"
        type="year"
        placeholder="Pick a year"
        @change="changeDataList(type.year)"
      />
    </div>

    <div class="echart1"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, reactive } from "vue";
// import { items } from "@/store/cost_list";
import axios from "axios";
import { ElMessage } from "element-plus";

axios.defaults.baseURL = "midolii.com";
const chart_length = 130;
const type = reactive({
  val: "",
  year: new Date(),
});
const chartRender = (chart, title_text, data0, data1, data2) => {
  const temp = {
    data0,
    data1,
    data2,
  };
  chart.setOption({
    title: {
      text: title_text,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "1%",
      // right: "0%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: temp.data0,
    },
    series: [
      {
        name: "支出",
        type: "bar",
        data: temp.data1,
        label: {
          show: true,
          position: "right",
          textStyle: {
            fontSize: "0.8rem",
            color: "#666",
          },
          formatter: "{a}{c}",
        },
      },
      {
        name: "收入",
        type: "bar",
        data: temp.data2,
        label: {
          show: true,
          position: "right",
          textStyle: {
            fontSize: "0.9rem",
            color: "#666",
          },
          formatter: "{a}{c}",
        },
      },
    ],
  });
};
const renderData = { data: [] };
onMounted(() => {
  const chart = echarts.init(
    document.getElementsByClassName("echart1")[0],
    null,
    { renderer: "svg" }
  );
  axios
    .post("/recordAction/getAllRecord", {
      userid: localStorage.userid,
    })
    .then((res) => {
      if (res.data.status == 1) {
        // const monthData=[{month:[],data:[]}]
        const monthData = [];
        for (let i = 0; i < 12; i++) {
          monthData[i] = {
            month: 0,
            year_month: "",
            income: 0,
            cost: 0,
          };
          monthData[i].month = i + 1;
        }
        renderData.data = res.data.content.msg;
        renderData.data.sort((a, b) => {
          const date1 = new Date(
            a.record_date_year,
            a.record_date_month,
            a.record_date_day,
            a.record_date_hour.toString().slice(0, 2),
            a.record_date_hour.toString().slice(3, 5),
            a.record_date_hour.toString().slice(6, 8)
          );
          const date2 = new Date(
            b.record_date_year,
            b.record_date_month,
            b.record_date_day,
            b.record_date_hour.toString().slice(0, 2),
            b.record_date_hour.toString().slice(3, 5),
            b.record_date_hour.toString().slice(6, 8)
          );
          if (date1.getTime() > date2.getTime()) {
            return -1;
          } else {
            return 1;
          }
        });
        res.data.content.msg.forEach((i) => {
          const cur = `${Number(i.record_date_year)} - ${Number(
            i.record_date_month
          )}`;
          monthData[Number(i.record_date_month) - 1].year_month = cur;
          if (i.is_income === 0) {
            monthData[Number(i.record_date_month) - 1].cost += Number(
              i.record_cost
            );
          } else if (i.is_income === 1) {
            monthData[Number(i.record_date_month) - 1].income += Number(
              i.record_cost
            );
          }
        });
        const temp = monthData.filter((i) => {
          if (i.year_month != "") {
            return true;
          }
          return false;
        });
        temp.sort((a, b) => {
          return a.month - b.month > 0;
        });
        chart.resize({
          height: temp.length * chart_length,
        });
        chartRender(
          chart,
          `${new Date().getFullYear()}年 支出/收入`,
          temp.map((i) => {
            return i.year_month;
          }),
          temp.map((i) => {
            return i.cost;
          }),
          temp.map((i) => {
            return i.income;
          })
        );
      } else {
        ElMessage.error("未获取到数据");
      }
    });
});

const changeDataList = (year) => {
  document
    .getElementsByClassName("echart1")[0]
    .removeAttribute("_echarts_instance_");
  document.getElementsByClassName("echart1")[0].innerHTML = "";
  const chart = echarts.init(
    document.getElementsByClassName("echart1")[0],
    null,
    { renderer: "svg" }
  );

  const monthData = [];
  for (let i = 0; i < 12; i++) {
    monthData[i] = {
      month: 0,
      year_month: "",
      income: 0,
      cost: 0,
    };
    monthData[i].month = i + 1;
  }
  renderData.data.forEach((i) => {
    if (i.record_date_year != year.getFullYear()) {
      return;
    }
    const cur = `${Number(i.record_date_year)} - ${Number(
      i.record_date_month
    )}`;
    monthData[Number(i.record_date_month) - 1].year_month = cur;
    if (i.is_income === 0) {
      monthData[Number(i.record_date_month) - 1].cost += Number(i.record_cost);
    } else if (i.is_income === 1) {
      monthData[Number(i.record_date_month) - 1].income += Number(
        i.record_cost
      );
    }
  });
  const temp = monthData.filter((i) => {
    if (i.year_month != "") {
      return true;
    }
    return false;
  });
  temp.sort((a, b) => {
    return a.month - b.month > 0;
  });
  chart.resize({
    height: temp.length * chart_length,
  });

  chartRender(
    chart,
    `${year.getFullYear()}年 支出/收入`,
    temp.map((i) => {
      return i.year_month;
    }),
    temp.map((i) => {
      return i.cost;
    }),
    temp.map((i) => {
      return i.income;
    })
  );
};

const sameWeek = (day) => {
  //当前日期
  let sameWeek = false;
  let time = new Date();
  let ye = time.getFullYear();
  let mo = time.getMonth() + 1;
  let da = time.getDate();
  let week = time.getDay();
  let beforeWeek = day;
  let nextWeek =
    new Date(`${ye}-${mo}-${da} 00:00:00`).getTime() -
    week * 24 * 60 * 60 * 1000;
  beforeWeek > nextWeek ? (sameWeek = true) : (sameWeek = false);
  return sameWeek; //返回是否本周;
};
const toggleType = (type) => {
  document
    .getElementsByClassName("echart1")[0]
    .removeAttribute("_echarts_instance_"); //清除原来的实例
  document.getElementsByClassName("echart1")[0].innerHTML = "";
  const chart = echarts.init(
    document.getElementsByClassName("echart1")[0],
    null,
    { renderer: "svg" }
  ); //创建新的echart实例

  const showData = [];
  if (type == 0) {
    for (let i = 0; i < renderData.data.length; i++) {
      const flag = sameWeek(
        new Date(
          renderData.data[i].record_date_year,
          renderData.data[i].record_date_month,
          renderData.data[i].record_date_day,
          0,
          0,
          0
        )
      );
      console.log(flag);
      if (!flag) {
        break;
      } else {
        showData.push(renderData.data[i]);
      }
    }
    const fullData = {};
    showData.forEach((i) => {
      fullData[i.record_date_month + "-" + i.record_date_day] = {
        cost: 0,
        income: 0,
      };
    });
    showData.forEach((i) => {
      if (i.is_income == 0) {
        fullData[i.record_date_month + "-" + i.record_date_day].cost += Number(
          i.record_cost
        );
      } else if (i.is_income == 1) {
        fullData[i.record_date_month + "-" + i.record_date_day].income +=
          Number(i.record_cost);
      }
    });
    const data0 = Object.keys(fullData);
    const data1 = Object.keys(fullData).map((i) => {
      return fullData[i].cost;
    });
    const data2 = Object.keys(fullData).map((i) => {
      return fullData[i].income;
    });
    chart.resize({
      height: data0.length * chart_length,
    });
    chartRender(chart, "本周消费", data0.reverse(), data1.reverse(), data2.reverse());
  } else if (type == 1) {
    console.log("month");
    const fullData = [];
    renderData.data.forEach((i) => {
      if (i.record_date_month != new Date().getMonth() + 1) {
        return;
      }
      const cur = i.record_date_month + "-" + i.record_date_day;
      if (fullData.indexOf(cur) == -1) {
        if (i.is_income == 0) {
          fullData.push({ date: cur, cost: Number(i.record_cost), income: 0 });
        } else if (i.is_income == 1) {
          fullData.push({ date: cur, cost: 0, income: Number(i.record_cost) });
        }
      } else {
        if (i.is_income == 0) {
          fullData[fullData.length - 1].cost += Number(i.record_cost);
        } else if (i.is_income == 1) {
          fullData[fullData.length - 1].income += Number(i.record_cost);
        }
      }
    });
    const newSet = new Set();
    fullData.forEach((i) => {
      newSet.add(i.date);
    });
    const data0 = Array.from(newSet);
    const data1 = [];
    const data2 = [];
    for (let i = 0; i < newSet.size; i++) {
      data1[i] = 0
      data2[i] = 0
      fullData.forEach((j) => {
        if (j.date == data0[i]) {
          data1[i] += Number(j.cost);
        }
      });
      fullData.forEach((j) => {
        if (j.date == data0[i]) {
          data2[i] += Number(j.income);
        }
      });
    }
    console.log(newSet, data0, data1, data2);
    chart.resize({
      height: data0.length * chart_length,
    });
    chartRender(chart, "本月消费", data0.reverse(), data1.reverse(), data2.reverse());
  } else if (type == 2) {
    changeDataList(new Date());
  }
};
</script>

<style lang="scss" scoped>
.echart {
  background: #fff;
  margin: 10px;
  border-radius: 4px;
  z-index: -1;
  display: flex;
  flex-direction: column;
  .main_header {
    margin: 10px 20px;
    display: flex;
    align-content: center;
    .el-select {
      width: 40%;
      margin: 0 20px 0 0;
    }
  }
  .echart1 {
    padding: 20px;
  }
}
</style>
