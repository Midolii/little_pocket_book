<template>
  <div class="main">
    <div class="self_card">
      <div class="self_card_img">
        <div class="self_left">
          <img :src="avator_url" alt="" />
          <p class="self_card_info font-12">{{ username }}</p>
        </div>
        <button class="my_btn">切换至群组</button>
      </div>
      <div class="hr"></div>
      <div class="total_cost">
        <div class="cost_item_info">
          <p class="font-12">今日消费</p>
          <p class="font-16">{{ totalAll.day_total }}<span> ¥</span></p>
        </div>
        <div class="cost_item_info">
          <p class="font-12">本周消费</p>
          <p class="font-16">{{ totalAll.week_total }}<span> ¥</span></p>
        </div>
        <div class="cost_item_info">
          <p class="font-12">本月消费</p>
          <p class="font-16">{{ totalAll.month_total }}<span> ¥</span></p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="selectType">
      <el-form :model="screenType">
        <el-form-item>
          <el-select v-model="screenType.val" placeholder="筛选" popper-class="select_option">
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
      </el-form>
    </div>
    <div class="cost_list_box">
      <div class="selectInfo">{{ selectInfo }}</div>
      <div class="my_Hr"></div>
      <div v-if="currentSelect.length === 0">
        <p class="font-12">暂无消费记录</p>
      </div>
      <div class="list" v-if="currentSelect.length > 0">
        <div v-for="item in currentSelect" :key="item">
          <cost-list-item :item="item" />
        </div>
        <div class="my-30">
          <span class="font-12"
            >总计
            <span class="font-bold">{{ currentSelect.length }}</span>
            条记录</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CostListItem from "@/components/Main/CostListItem.vue";
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { items, totalAll, sameWeek } from "@/store/cost_list";
import { reactive } from "vue";
// import store from "@/store";

const screenType = reactive({
  val: "",
});
const username = localStorage.username;
const avator_url = localStorage.avatar_url;
const selectInfo = ref("今日消费记录: ");
const currentSelect = ref([]);

const toggleData = (type) => {
  if (type == 0) {
    selectInfo.value = "今日消费记录: ";
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
    selectInfo.value = "本周消费记录: ";
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
    selectInfo.value = "本月消费记录: ";
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
    selectInfo.value = "所有消费记录: ";
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
      totalAll.week_total = Number(items.flashTotal(1)).toFixed(2);
      totalAll.month_total = Number(items.flashTotal(2)).toFixed(2);
      toggleData("0");
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
    background-color: #fff;
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
        background-color: #fff;
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
    background-color: #fff;
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
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
  font-weight: bold;
}
.my_Hr {
  align-self: center;
  margin: 4px 0;
  width: 90%;
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
