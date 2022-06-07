<template>
  <div class="loginBox">
    <div class="loginTitle">Login</div>
    <div class="loginForm">
      <el-form :model="form" label-width="60px" @keyup.enter="login">
        <el-form-item label="账户">
          <el-input
            v-model="form.login_username"
            placeholder="请输入UID或者邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-row justify="end" :gutter="20">
        <el-col :span="18" style="text-align: right">
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
import axios from "axios";
import { ElMessage } from "element-plus";
import { getHash } from "@/lib/getHash.js";
// import store from "@/store";

const { form } = user();
const login = () => {
  if (!form.login_username) {
    ElMessage.error("请输入用户名");
    return;
  }
  if (!form.password) {
    ElMessage.error("请输入密码");
    return;
  }
  const reqDataBody = {
    password: getHash(form.password),
  };
  if (form.login_username.includes("@")) {
    reqDataBody.email = form.login_username;
  } else {
    reqDataBody.userid = form.login_username;
  }
  axios
    .post("userAction/login", reqDataBody)
    .then((res) => {
      if (res.data.status == 1) {
        localStorage.username = res.data.content.data.username;
        localStorage.avatar_url =
          res.data.content.data.avatar_url === ""
            ? "https://s3.bmp.ovh/imgs/2022/05/27/edcb768f48e287c6_thumb.png"
            : res.data.content.data.avatar_url;
        localStorage.token = res.data.content.token;
        localStorage.userid = res.data.content.data.userid;
        localStorage.email = res.data.content.data.email;
        form.clear();
        router.push({
          path: "/",
        });
      } else {
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
const goRegister = () => {
  form.clear()
  router.push({
    path: "/register",
  });
};
</script>

<style lang="scss" scoped>
.loginBox {
  // width: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  // padding: 20px 40px;
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);
  width: 100%;

  .loginTitle {
    font-size: 2.5rem;
    font-weight: bold;
    padding: 20px;
    letter-spacing: 2px;
  }

  .loginForm {
    padding: 20px 40px;

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

