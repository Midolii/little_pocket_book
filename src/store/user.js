import {
  reactive
} from "vue";
const form = reactive({
  username: "",
  password: "",
  email: "",
  password1: "",
  password2: "",
})
export function user() {
  return {
    form
  }
}
