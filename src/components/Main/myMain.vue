<template>
  <div class="main">
    <div class="self_card">
      <div class="self_card_img">
        <div class="self_left">
          <img :src="avator_url" alt="" />
          <p class="self_card_info font-12">{{ username }}</p>
        </div>
        <!-- <button class="my_btn">切换至群组</button> -->
        <!-- <button class="my_btn" @click="logout">登出</button> -->
        <button class="my_btn" @click="toggleIncome">
          {{ toggleIncomeText }}
        </button>
      </div>
      <div class="hr"></div>
      <div class="total_cost" v-if="is_income">
        <div class="cost_item_info">
          <p class="font-12 text-gray-500">今日收入</p>
          <p
            class="font-16"
            :class="{
              'text-green-700': is_income,
            }"
          >
            {{ totalAll.day_total_in }}<span> ¥</span>
          </p>
        </div>
        <div class="cost_item_info">
          <p class="font-12 text-gray-500">本周收入</p>
          <p
            class="font-16"
            :class="{
              'text-green-700': is_income,
            }"
          >
            {{ totalAll.week_total_in }}<span> ¥</span>
          </p>
        </div>
        <div class="cost_item_info">
          <p class="font-12 text-gray-500">本月收入</p>
          <p
            class="font-16"
            :class="{
              'text-green-700': is_income,
            }"
          >
            {{ totalAll.month_total_in }}<span> ¥</span>
          </p>
        </div>
      </div>
      <div class="total_cost" v-if="!is_income">
        <div class="cost_item_info">
          <p class="font-12 text-gray-500">今日消费</p>
          <p
            class="font-16"
            :class="{
              'text-blue-700': !is_income,
            }"
          >
            {{ totalAll.day_total }}<span> ¥</span>
          </p>
        </div>
        <div class="cost_item_info">
          <p class="font-12 text-gray-500">本周消费</p>
          <p
            class="font-16"
            :class="{
              'text-blue-700': !is_income,
            }"
          >
            {{ totalAll.week_total }}<span> ¥</span>
          </p>
        </div>
        <div class="cost_item_info">
          <p class="font-12 text-gray-500">本月消费</p>
          <p
            class="font-16"
            :class="{
              'text-blue-700': !is_income,
            }"
          >
            {{ totalAll.month_total }}<span> ¥</span>
          </p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="selectType">
      <el-form :model="screenType">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item>
              <el-select
                v-model="screenType.val"
                placeholder="筛选"
                popper-class="select_option"
              >
                <el-option
                  label="今日"
                  value="0"
                  @click="toggleData(screenType.val)"
                />
                <el-option
                  label="本周"
                  value="1"
                  @click="toggleData(screenType.val)"
                />
                <el-option
                  label="本月"
                  value="2"
                  @click="toggleData(screenType.val)"
                />
                <el-option
                  label="所有"
                  value="3"
                  @click="toggleData(screenType.val)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="5">
              <el-col :span="12"
                ><el-date-picker
                  v-model="clickDateStart"
                  style="width: 100%"
                  @change="changeDataList(clickDateStart, clickDateStart)"
                  placeholder="起始日期"
              /></el-col>
              <el-col :span="12"
                ><el-date-picker
                  v-model="clickDateEnd"
                  @change="changeDataList(clickDateStart, clickDateEnd)"
                  style="width: 100%"
                  placeholder="结束日期"
              /></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="cost_list_box">
      <div class="selectInfo">
        {{ selectInfo }}<span>{{ currentSelect.length }}条</span>
      </div>
      <div class="my_Hr"></div>
      <div v-if="currentSelect.length === 0">
        <p class="font-12">暂无消费记录</p>
      </div>
      <div class="list" v-if="currentSelect.length > 0">
        <div v-for="item in currentSelect" :key="item">
          <cost-list-item :item="item" />
        </div>
      </div>
      <div class="my_Hr"></div>
      <div class="my-30">
        <span class="font-12">
          总计
          <span class="font-bold">{{ currentSelect.length }}</span>
          条记录</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import CostListItem from "@/components/Main/CostListItem.vue";
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { items, totalAll, sameWeek, currentSelect } from "@/store/cost_list";
import { reactive } from "vue";
// import router from "@/router";
// import store from "@/store";

const screenType = reactive({
  val: "",
});
const username = localStorage.username;
const avator_url = localStorage.avatar_url;
const selectInfo = ref("今日支出|收入记录: ");
const clickDateStart = ref(null);
const clickDateEnd = ref(null);
const is_income = ref(false);
// const logout = () => {
//   localStorage.clear();
//   router.push({
//     path: "/login",
//   });
// };
const toggleIncomeText = ref("查看收入");
const toggleIncome = () => {
  is_income.value = !is_income.value;
  toggleIncomeText.value = "查看消费";
};

const changeDataList = (data, data1) => {
  if (data === null || data1 === null) {
    currentSelect.value = items.data;
    selectInfo.value = "所有支出|收入记录: ";
    return;
  }
  if (data != data1) {
    currentSelect.value = items.data.filter((item) => {
      const itemDate = new Date(
        item.record_date_year,
        item.record_date_month - 1,
        item.record_date_day
      );
      return itemDate >= data && itemDate <= data1;
    });
    selectInfo.value = `${data.toLocaleDateString()}至${data1.toLocaleDateString()}支出|收入记录: `;
    return;
  }

  let y = data.getFullYear();
  let m = data.getMonth() + 1;
  let d = data.getDate();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  console.log(y + "-" + m + "-" + d);
  currentSelect.value = items.data.filter((i) => {
    return (
      i.record_date_year == y &&
      i.record_date_month == m &&
      i.record_date_day == d
    );
  });
  selectInfo.value = `${y}-${m}-${d}日支出|收入记录: `;
};

const toggleData = (type) => {
  clickDateStart.value = null;
  clickDateEnd.value = null;
  if (type == 0) {
    selectInfo.value = "今日支出|收入记录: ";
    let today = new Date().getDate();
    if (today < 10) {
      today = "0" + today;
    }
    const day = today;
    const mon = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    currentSelect.value = items.data.filter((item) => {
      return (
        item.record_date_day == day &&
        item.record_date_month == mon &&
        item.record_date_year == year
      );
    });
  }
  if (type == 1) {
    selectInfo.value = "本周支出|收入记录: ";
    currentSelect.value = items.data.filter((item) => {
      return sameWeek(
        new Date(
          item.record_date_year,
          item.record_date_month - 1,
          item.record_date_day,
          0,
          0,
          0
        ).getTime()
      );
    });
  }
  if (type == 2) {
    selectInfo.value = "本月支出|收入记录: ";
    let mon = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    if (mon < 10) {
      mon = "0" + mon;
    }
    currentSelect.value = items.data.filter((item) => {
      return item.record_date_month == mon && item.record_date_year == year;
    });
  }
  if (type == 3) {
    selectInfo.value = "所有支出|收入记录: ";
    currentSelect.value = items.data;
  }
};

axios
  .post("/recordAction/getAllRecord", {
    userid: localStorage.userid,
  })
  .then((res) => {
    if (res.data.status == 1) {
      res.data.content.msg.forEach((i) => {
        items.data.push(i);
      });
      items.flashList();
      totalAll.day_total = Number(items.flashTotal()).toFixed(2);
      totalAll.week_total = Number(items.flashWeekTotal()).toFixed(2);
      totalAll.month_total = Number(items.flashMonthTotal()).toFixed(2);
      totalAll.month_total_in = Number(items.flashMonthInTotal()).toFixed(2);
      totalAll.week_total_in = Number(items.flashWeekInTotal()).toFixed(2);
      totalAll.day_total_in = Number(items.flashInTotal()).toFixed(2);
      toggleData("3");
    } else {
      ElMessage.error("未获取到数据");
    }
  });
</script>

<style lang="scss" scoped>
.main {
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  //
  .self_card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 200px;
    width: 100%;
    background-color: #ffffffc9;
    border-radius: 8px;
    //
    .self_card_img {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      .self_left {
        display: flex;
        align-items: center;
        margin: 10px;
        overflow: hidden;
        max-width: 210px;
        img {
          height: 64px;
          width: 64px;
          border-radius: 50%;
          background-color: aliceblue;
        }
        .self_card_info {
          margin: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      //

      .my_btn {
        margin: 0 10px;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px 10px;
        color: #000;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .my_btn:hover {
        background-color: #ccc;
        transition: all 0.3s ease;
      }
    }
    //
    .hr {
      align-self: center;
      margin: 4px 0;
      width: 90%;
      height: 2px;
      border-radius: 8px;
      background-color: #eee;
    }
    //
    .total_cost {
      width: 100%;
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      //
      .cost_item_info {
        flex: 1 1 auto;
        margin: 10px;
        //
        p {
          margin-block-start: 0.3rem;
          margin-block-end: 0.3rem;
          span {
            font-weight: bold;
            font-size: 1.1rem;
          }
        }
      }
    }
  }
  //
  .cost_list_box {
    display: flex;
    flex-direction: column;
    min-height: 300px;
    max-height: 700px;
    width: 100%;
    background-color: #ffffffc9;
    border-radius: 8px;
    margin: 0;
    padding: 10px 0;
    .list {
      overflow: scroll;
    }
  }
}
.selectType {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
  width: 100%;
  z-index: 0;
}
.selectInfo {
  text-align: left;
  margin: 0 30px;
  font-size: 1.1rem;
  letter-spacing: 2px;
  font-weight: bold;
  span {
    letter-spacing: 2px;
  }
}
.my_Hr {
  align-self: center;
  margin: 4px 0;
  width: 80%;
  height: 2px;
  border-radius: 8px;
  background-color: #eee;
}
.font-12 {
  font-size: 1.2rem;
}
.font-bold {
  font-weight: bold;
}
.my-30 {
  margin: 30px 0;
}
</style>
