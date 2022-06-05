<template>
  <div class="item_card">
    <div class="cost_type">
      <svg
        t="1653637443322"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2820"
        width="200"
        height="200"
      >
        <path
          d="M512 85.333333c71.477333 0 159.68 57.546667 229.258667 147.018667C817.845333 330.826667 864 455.978667 864 586.666667c0 211.808-148.501333 352-352 352S160 798.474667 160 586.666667c0-130.688 46.144-255.84 122.741333-354.314667C352.32 142.88 440.522667 85.333333 512 85.333333z m0 64c-48.213333 0-120.096 46.912-178.741333 122.314667C265.109333 359.253333 224 470.762667 224 586.666667c0 175.616 119.050667 288 288 288s288-112.384 288-288c0-115.904-41.109333-227.402667-109.258667-315.018667C632.096 196.234667 560.213333 149.333333 512 149.333333z m-74.666667 522.666667a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m-96-128a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z"
          p-id="2821"
        ></path>
      </svg>
    </div>
    <div class="hr_col"></div>
    <div class="cost_info">
      <div class="first_line">
        <span>{{ item.time }}</span>
      </div>
      <div class="second_line">
        <span class="flex_auto">{{ item.address }}</span>
        <span
          >{{ item.cost }} <span class="font-bold font-12">{{ currency }}</span></span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const currency = "¥";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      time: "2020-01-01",
      address: "Test...",
      cost: "100",
    }),
  },
});

const { item } = toRefs(props);
</script>

<style lang="scss" scoped>
.item_card {
  margin: 5px 20px 10px 20px;
  display: flex;
  align-items: center;
  //
  .cost_type {
    margin: 4px 10px;
    svg {
      height: 32px;
      width: 32px;
    }
  }
  //
  .hr_col {
    height: 28px;
    width: 2px;
    border-radius: 4px;
    background-color: #e5e5e5;
  }
  //
  .cost_info {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    font-size: 0.9rem;
    //
    div {
      margin: 2px 10px;
    }
    .first_line {
      font-weight: bold;
      display: flex;
    }
    //
    .second_line {
      display: flex;
      font-size: 1rem;
      text-align: left;
      justify-content: space-between;
      span {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        max-width: 160px;
      }
    }
  }
}

.flex_auto {
  flex: 1 1 auto;
}
.font-bold {
  font-weight: bold;
}
.font-12{
  font-size: 1.2rem;
}
</style>
