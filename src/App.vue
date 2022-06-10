<template>
  <!-- <div class="footer">
    <div class="home">主页</div>
    <div class="home">1</div>
    <div class="home">2</div>
  </div> -->
  <div class="fixed">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,192L60,192C120,192,240,192,360,176C480,160,600,128,720,101.3C840,75,960,53,1080,64C1200,75,1320,117,1380,138.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
  </div>
  <transition name="toggleRouterView">
    <router-view></router-view>
  </transition>
</template>

<style lang="scss">
.footer {
  position: fixed;
  height: 50px;
  width: 100%;
  background: #42b983;
  bottom: 0px;
}

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
.fixed {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -1;
  svg {
    position: absolute;
    bottom: 0px;
    left: 0px;
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
