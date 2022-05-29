<template>
  <div class="add_record">Add</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.add_record {
  height: 42px;
  width: 42px;
  padding: 6px;
  opacity: 0.7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  box-shadow: 3px 3px 10px rgb(0 0 0 / 10%);
  z-index: 999;
  transition: opacity 0.3s ease;
}
.add_record:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
