<template>
  <div class="registerBox">
    <div class="registerTitle">Register</div>
    <div class="registerForm">
      <el-form :model="form" :label-width="80">
        <el-row :gutter="20" justify="end">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input
                v-model="form.email"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" justify="end">
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input
                v-model="form.password1"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码">
              <el-input
                v-model="form.password2"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end" :gutter="20">
          <el-col :span="8">
            <el-link
              class="tips"
              :underline="false"
              type="info"
              v-on:click="toLogin"
              >已经有账号了？点击登录</el-link
            >
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="register">注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { user } from "@/store/user.js";
import router from "@/router/index.js";

const { form } = user();

const register = () => {};

const toLogin = () => {
  router.push({
    path: "/login",
  });
};
</script>

<style lang="scss" scoped>
.registerBox {
  width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);

  .registerTitle {
    font-size: 2.5rem;
    font-weight: bold;
    padding: 20px;
    letter-spacing: 2px;
  }

  .registerForm {
    padding: 20px 0;

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
