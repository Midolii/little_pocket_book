<template>
  <div class="header">
    <router-link to="/" class="goIndex">
      <p class="font-13 letter-spacing-1 uppercase">{{ title }}</p>
    </router-link>
    <div class="userinfo">
      <p class="font-1 letter-spacing-1 mx-10">{{ username }}</p>
      <img class="box-32 avator" :src="avator_url" alt="" />
    </div>
  </div>
</template>

<script setup>

import store from '@/store'

const title = "Hello world";

const avator_url = store.state.avator_url;
const username = store.state.username;

</script>

<style lang="scss" scoped>
.header {
  // min-height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 10%);
  // 
  .goIndex {
    text-decoration: none;
    color: #2c3e50;
    -webkit-tap-highlight-color:transparent;
  }
  // 
  .userinfo {
    display: flex;
    align-items: center;
    // 
    .avator {
      padding: 4px;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

//
p {
  margin-block-start: 0.7rem;
  margin-block-end: 0.7rem;
}
.font-13 {
  font-size: 1.3rem;
}
.font-10 {
  font-size: 1rem;
}
.font-09 {
  font-size: 0.9rem;
}
.letter-spacing-1 {
  letter-spacing: 1px;
}
.box-32 {
  width: 32px;
  height: 32px;
}

.uppercase {
  text-transform: uppercase;
}
.mx-10 {
  margin: 10px;
}
</style>
