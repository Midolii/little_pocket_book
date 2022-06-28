<template>
  <div class="registerBox">
    <div class="registerTitle">Register</div>
    <div class="registerForm">
      <el-form :model="form" :label-width="80">
        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="用户名">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮箱">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="24">
            <el-form-item label="密码">
              <el-input
                v-model="form.password1"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码">
              <el-input
                v-model="form.password2"
                placeholder="重复输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" style="text-align: right">
            <el-link
              class="tips"
              :underline="false"
              type="info"
              v-on:click="toLogin"
              >已经有账号了？点击登录</el-link
            >
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="register">注册</el-button>
            <p @click="clear"></p>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { user } from "@/store/user.js";
import router from "@/router/index.js";
import axios from "axios";
import { ElMessage } from "element-plus";
import { getHash } from "@/lib/getHash.js";

axios.defaults.baseURL = "http://180.76.134.27:3000"

const { form } = user();
const register = () => {
  const email_reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  if (!form.username) {
    ElMessage.error("请输入用户名");
    return;
  }
  if (!form.email) {
    ElMessage.error("请输入邮箱");
    return;
  }
  if (!email_reg.test(form.email)) {
    ElMessage.error("邮箱格式不正确");
    return;
  }
  form.login_username = form.email
  if (form.password1 !== form.password2) {
    ElMessage.error("两次密码不一致");
    return;
  }
  form.crypto_password = getHash(form.password1);
  axios
    .post("userAction/register", {
      username: form.username,
      password: form.crypto_password,
      email: form.email,
    })
    .then((res) => {
      if (res.data.status == 1) {
        // localStorage.token = res.data.content.token
        ElMessage({
          duration: 3000,
          message: "注册成功, 请登录",
          type: "success",
        });
        toLogin();
      } else {
        console.log(res.data);
        ElMessage({
          duration: 1500,
          message: res.data.content.msg,
          type: "error",
        });
      }
    })
    .catch(() => {
      ElMessage({
        duration: 1500,
        message: "服务器离线, 请等待修复.",
        type: "error",
      });
    });
};

const toLogin = () => {
  router.push({
    path: "/login",
  });
};

const clear = () => {
  form.clear();
};
</script>

<style lang="scss" scoped>
.registerBox {
  // width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  // padding: 20px 20px;
  padding: 30px 0;
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);
  width: 100%;

  .registerTitle {
    font-size: 2.5rem;
    font-weight: bold;
    padding: 20px;
    letter-spacing: 2px;
  }

  .registerForm {
    // padding: 20px 0;
    padding: 0 20px;

    .tips:hover {
      transition: color 0.3s ease;
      color: #79bbff;
    }

    .el-row {
      // padding: 10px 0;
    }
  }
}
</style>
