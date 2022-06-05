import {
  reactive
} from "vue";
const form = reactive({
  userid: "",
  username: "",
  login_username: "",
  crypto_password: "",
  password: "",
  email: "",
  password1: "",
  password2: "",
  avatar_url: "https://s3.bmp.ovh/imgs/2022/05/27/edcb768f48e287c6_thumb.png",
  clear:()=>{
    form.userid = ""
    form.username = ""
    form.crypto_password = ""
    form.password = ""
    form.email = ""
    form.password1 = ""
    form.password2 = ""
    // form.avatar_url = "https://s3.bmp.ovh/imgs/2022/05/27/edcb768f48e287c6_thumb.png"
    form.login_username = ""
  }
})
export function user() {
  return {
    form,
  }
}
