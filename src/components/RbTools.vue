<template>
  <div class="rb">
    <!-- <div class="click_to_look" @click="popupWindow"></div> -->
    <div><go-top /></div>
    <div><add-cost-record /></div>
  </div>
  <div v-if="is_click" class="fixed">
    <!-- <div class="popup_window"></div> -->
  </div>
</template>

<script setup>
import GoTop from "@/components/goTop";
import AddCostRecord from "@/components/addCostRecord";
// import { ref } from "vue";
// const is_click = ref(false);
// const popupWindow = () => {
//   is_click.value = true;
// };
</script>

<style lang="scss" scoped>
.rb {
  position: fixed;
  right: 32px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  div {
    margin: 2px;
    font-weight: bold;
  }
  .click_to_look {
    height: 36px;
    width: 36px;
    padding: 4px;
    opacity: 0.5;
    border-radius: 50%;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: 3px 3px 10px rgb(0 0 0 / 10%);
    z-index: 999;
  }

  .click_to_look:hover {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup_window {
    width: 300px;
    background: #fff;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .time {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item_main {
      margin: 10px 0;
    }
  }
}
</style>
