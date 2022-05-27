<template>
  <div class="loginBox">
    <div class="loginTitle">Login</div>
    <div class="loginForm">
      <el-form :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-row justify="end" :gutter="20">
        <el-col :span="12">
          <el-link
            class="tips"
            :underline="false"
            type="info"
            @click="goRegister"
            >还没有账号？点击注册</el-link
          >
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="login">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { user } from "@/store/user.js";
import router from "@/router/index.js";
// import axios from 'axios'

const { form } = user();
const login = () => {};
const goRegister = () => {
  router.push({
    path: "/register",
  });
};
</script>

<style lang="scss" scoped>
.loginBox {
  width: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);

  .loginTitle {
    font-size: 2.5rem;
    font-weight: bold;
    padding: 20px;
    letter-spacing: 2px;
  }

  .loginForm {
    padding: 20px 80px;

    .tips:hover {
      transition: color 0.3s ease;
      color: #79bbff;
    }
    .el-row {
      padding: 10px 0;
    }
  }
}
</style>

