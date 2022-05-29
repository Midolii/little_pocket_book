<template>
  <div class="rb">
    <div><go-top /></div>
    <div><add-cost-record /></div>
  </div>
</template>

<script setup>
import GoTop from "@/components/goTop";
import AddCostRecord from "@/components/addCostRecord";
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
  div{
    margin: 2px;
    font-weight: bold;
  }
}
</style>
