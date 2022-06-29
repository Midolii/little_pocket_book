<template>
  <my-header />
  <div class="my_fixed">
    <img src="./assets/bg.svg" alt="" srcset="">
  </div>
  <transition name="toggleRouterView">
    <router-view></router-view>
  </transition>
  <rb-tools />
</template>

<script setup>
import RbTools from '@/components/RbTools.vue'
import myHeader from '@/components/Main/myHeader.vue'
</script>

<style lang="scss">
body {
  padding: 0px;
  margin: 0px;
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.my_fixed {
  height: 100%;
  width: 100%;
  z-index: -1;
  img {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: inherit;
  }
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.toggleRouterView-enter-active,
.toggleRouterView-leave-active {
  transition: all 0.3s ease;
}

.toggleRouterView-enter-from,
.toggleRouterView-leave-to {
  opacity: 0;
}
</style>
