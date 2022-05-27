<template>
  <div class="main">

    <div class="self_card">
      <div class="self_card_img">
        <img :src="avator_url" alt="" />
        <p class="self_card_info font-12">{{ username }}</p>
      </div>
      <div class="hr"></div>
      <div class="total_cost">
        <div class="cost_item_info">
          <p class="font-12">日消费</p>
          <p class="font-16">{{ day_total_cost }}</p>
        </div>
        <div class="cost_item_info">
          <p class="font-12">周消费</p>
          <p class="font-16">{{ week_total_cost }}</p>
        </div>
        <div class="cost_item_info">
          <p class="font-12">年消费</p>
          <p class="font-16">{{ year_total_cost }}</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="cost_list">
      <div v-if="items.length === 0">
        <p class="font-12">暂无消费记录</p>
      </div>
      <div v-if="items.length > 0">
        <cost-list-item v-for="item in items" :key="item" :name="item.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CostListItem from "@/components/Main/CostListItem.vue";
import { reactive, ref } from "vue";
import store from "@/store";

const username = store.state.username;
const avator_url = store.state.avator_url;
const day_total_cost = ref(0);
const week_total_cost = ref(0);
const year_total_cost = ref(0);
// const temp = [
//   {
//     name: "123",
//   },
//   {
//     name: "456",
//   },
// ];
const items = reactive([]);
</script>

<style lang="scss" scoped>
.main {
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
      margin: 10px;

      //
      img {
        height: 64px;
        width: 64px;
        border-radius: 50%;
        background-color: aliceblue;
      }
      .self_card_info {
        margin: 0 20px;
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
        }
      }
    }
  }
  //
  .cost_list {
    display: flex;
    flex-direction: column;
    min-height: 900px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    margin: 20px 0;
    padding: 20px 0;
  }
}

.font-12 {
  font-size: 1.2rem;
}
</style>
