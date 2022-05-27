<template>
  <transition name="toggleRouterView">
    <router-view></router-view>
  </transition>
  <go-top />
</template>

<script setup>
import GoTop from '@/components/goTop';
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
