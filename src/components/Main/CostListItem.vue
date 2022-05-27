<template>
  <div class="item">
    {{ name }}
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const {name } = toRefs(props);
</script>

<style lang="scss" scoped>
.item{
  margin:5px 20px;
  display: flex;
  align-items: flex-start;
}
</style>
