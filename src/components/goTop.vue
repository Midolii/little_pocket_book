<template>
  <div class="goTop" @click="goTop">Top</div>
</template>

<script setup>
const goTop = () => {
  window.scrollTo(0, 0)
};
</script>

<style scoped lang="scss">
.goTop {
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

.goTop:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
