<template>
  <div
    :class="{
      chart: true,
    }"
    @click="chart"
    v-show="!is_click"
  >
    <router-link to="/chart">
      <img src="../assets/chart-bar.svg" alt="" srcset="" />
    </router-link>
  </div>
  <div
    :class="{
      chart: true,
    }"
    @click="chart"
    v-show="is_click"
  >
    <router-link to="/">
      <img src="../assets/cheveron-left.svg" alt="" srcset="" />
    </router-link>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
// import { useRoute } from "vue-router";
import router from "@/router";

const is_click = ref(false);
watchEffect(() => {
  if (router.currentRoute.value.fullPath === "/chart") {
    is_click.value = true;
  } else {
    is_click.value = false;
  }
});
</script>

<style scoped lang="scss">
.chart {
  height: 36px;
  width: 36px;
  padding: 4px;
  opacity: 0.7;
  border-radius: 50%;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 3px 3px 10px rgb(0 0 0 / 10%);
  z-index: 999;
}

.chart:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.fixed {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
