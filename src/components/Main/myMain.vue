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
          <p class="font-12">日消费</p>
          <p class="font-16">{{ day_total_cost }}<span> ¥</span></p>
        </div>
        <div class="cost_item_info">
          <p class="font-12">周消费</p>
          <p class="font-16">{{ week_total_cost }}<span> ¥</span></p>
        </div>
        <div class="cost_item_info">
          <p class="font-12">月消费</p>
          <p class="font-16">{{ month_total_cost }}<span> ¥</span></p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="cost_list_box">
      <div v-if="items.length === 0">
        <p class="font-12">暂无消费记录</p>
      </div>
      <div class="list" v-if="items.length > 0">
        <div v-for="item in items" :key="item">
          <cost-list-item :item="item" />
        </div>
        <div class="my-30">
          <span class="font-12"
            >总计 <span class="font-bold">{{ items.length }}</span> 条记录</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CostListItem from "@/components/Main/CostListItem.vue";
import { reactive, ref } from "vue";
// import store from "@/store";

const username = localStorage.username;
const avator_url = localStorage.avatar_url;
const day_total_cost = ref(100);
const week_total_cost = ref(700);
const month_total_cost = ref(3000);
const temp = [
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
  {
    time: "2020-01-01",
    address: "哈尔滨市道外区",
    cost: "100",
  },
];
const items = reactive(temp);
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
          span{
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
    max-height: 500px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    margin: 20px 0;
    padding: 10px 0;
    .list {
      overflow: scroll;
    }
  }
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
