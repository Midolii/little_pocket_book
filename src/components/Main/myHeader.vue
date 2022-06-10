<template>
  <div class="header">
    <router-link to="/" class="goIndex">
      <p class="font-13 letter-spacing-1 uppercase">{{ title }}</p>
    </router-link>
    <div class="userinfo">
      <div class="flex_top">
        <p class="font-1 letter-spacing-1 mx-10">{{ username }}</p>
        <img
          class="box-32 avator"
          :src="avator_url"
          alt=""
          @click="toggleAvatar()"
        />
      </div>
      <transition name="toggleRouterView">
        <div class="logout" v-show="isClickedAvatar">
          <Button @click="logout"> 登出 </Button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
// import store from '@/store'

import { ref } from "vue";
import router from "@/router";

// import {reactive} from 'vue'
const title = "Simple记账簿";
const avator_url = localStorage.avatar_url;
const username = localStorage.username;
const isClickedAvatar = ref(false);
const toggleAvatar = () => {
  isClickedAvatar.value = !isClickedAvatar.value;
};

const logout = () => {
  localStorage.clear();
  router.push({
    path: "/login",
  });
};
</script>

<style lang="scss" scoped>
.header {
  font-weight: bold;
  // min-height: 60px;
  height: 60px;
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
    -webkit-tap-highlight-color: transparent;
  }
  //
  .userinfo {
    display: block;
    height: 100%;
    //
    .flex_top {
      display: flex;
      flex-direction: row;
      height: 100%;
      align-items: center;
      .avator {
        padding: 4px;
        border-radius: 50%;
        background-color: #eee;
        box-shadow: 2px 2px 4px 0px rgba(0 0 0 / 10%);
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
    }
    .logout {
      position: absolute;
      width: 90px;
      right: 20px;
      margin: 10px 0;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 10%);
      display: flex;
      justify-content: center;
      flex-direction: column;
      button {
        padding: 10px;
        border: none;
        background: transparent;
        font-size: 0.8rem;
        width: 100%;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transition: all 0.3s ease;
      }
      button:active {
        font-weight: bold;
        transition: all 0.3s ease;
      }
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
