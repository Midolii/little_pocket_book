<template>
  <div :class="{
    income: item.is_income == 1,
    cost: item.is_income == 0,
    item_card: true,
  }" @click="popup(item)">
    <div class="cost_type">
      <svg t="1653637443322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2820" width="200" height="200">
        <path
          d="M512 85.333333c71.477333 0 159.68 57.546667 229.258667 147.018667C817.845333 330.826667 864 455.978667 864 586.666667c0 211.808-148.501333 352-352 352S160 798.474667 160 586.666667c0-130.688 46.144-255.84 122.741333-354.314667C352.32 142.88 440.522667 85.333333 512 85.333333z m0 64c-48.213333 0-120.096 46.912-178.741333 122.314667C265.109333 359.253333 224 470.762667 224 586.666667c0 175.616 119.050667 288 288 288s288-112.384 288-288c0-115.904-41.109333-227.402667-109.258667-315.018667C632.096 196.234667 560.213333 149.333333 512 149.333333z m-74.666667 522.666667a53.333333 53.333333 0 1 1 0 106.666667 53.333333 53.333333 0 0 1 0-106.666667z m-96-128a42.666667 42.666667 0 1 1 0 85.333333 42.666667 42.666667 0 0 1 0-85.333333z"
          p-id="2821"></path>
      </svg>
    </div>
    <div class="hr_col"></div>
    <div class="cost_info">
      <div class="first_line">
        <span>{{ item.record_date_year }}-{{ item.record_date_month }}-{{
            item.record_date_day
        }}
          / {{ item.record_date_hour }}</span>
      </div>
      <div class="second_line">
        <span class="flex_auto">{{ item.record_content }}</span>
        <span><span> {{ item.is_income == 1 ? "+ " : "- " }} </span>{{ item.record_cost }}
          <span class="font-bold font-12">{{ currency }}</span></span>
      </div>
    </div>
  </div>

  <transition name="toggleRouterView">
    <div class="fixed" v-if="clickItem.flag == 1" @click="closePopupWindow">
      <div :class="{
        income: item.is_income == 1,
        cost: item.is_income == 0,
        popup_window: true,
      }" @click.stop>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-3 sm:px-6" v-if="isEdit == false">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ clickItem.data.record_date_year }}-{{
                  clickItem.data.record_date_month
              }}-{{ clickItem.data.record_date_day }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              {{ clickItem.data.record_date_hour }}
            </p>
          </div>
          <!-- 时间选择 -->
          <div class="px-1 py-3 sm:px-6" v-if="isEdit == true">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-date-picker v-model="clickItem.data.record_date_full" type="date" placeholder="选择日期"
                  :disabled-date="disabledDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" style="width: 100%" />
              </el-col>
              <el-col :span="12">
                <el-time-picker v-model="clickItem.data.record_hour" placeholder="选择时间" style="width: 100%" />
              </el-col>
            </el-row>
          </div>

          <div class="border-t border-gray-200">
            <dl>
              <div class="
                  bg-gray-50
                  px-4
                  py-3
                  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                ">
                <dt class="text-sm font-medium text-gray-500">
                  邮件地址｜昵称
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span :class="{
                    'text-blue-700': clickItem.data.is_income == 1,
                    'text-green-700': clickItem.data.is_income == 0,
                  }">
                    {{ localEmail }} |
                  </span>
                  <span :class="{
                    'text-blue-700': clickItem.data.is_income == 0,
                    'text-green-700': clickItem.data.is_income == 1,
                  }">{{ localUsername }}</span>
                </dd>
              </div>

              <div class="
                  bg-white
                  px-4
                  py-3
                  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                ">
                <dt class="text-sm font-medium text-gray-500" v-if="isEdit == false">
                  <span :class="{
                    'text-blue-700': clickItem.data.is_income == 0,
                  }">支出</span>
                  |
                  <span :class="{
                    'text-green-700': clickItem.data.is_income == 1,
                  }">收入</span>
                </dt>
                <dt class="text-sm font-medium text-gray-500" v-if="isEdit == true">
                  <button :class="{
                    'text-blue-700': clickItem.data.is_income == 0,
                    'bg-blue-200': clickItem.data.is_income == 0,
                    'border-2': true,
                    'rounded-md': true,
                    'px-2': true,
                    'py-1': true,
                  }" @click="toggleCostType(clickItem.data.is_income)">
                    支出
                  </button>
                  |
                  <button :class="{
                    'text-green-700': clickItem.data.is_income == 1,
                    'bg-green-200': clickItem.data.is_income == 1,
                    'border-2': true,
                    'rounded-md': true,
                    'px-2': true,
                    'py-1': true,
                  }" @click="toggleCostType(clickItem.data.is_income)">
                    收入
                  </button>
                </dt>

                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span :class="{
                    'text-green-700': item.is_income == 1,
                    'text-blue-700': item.is_income == 0,
                  }" v-if="isEdit == false">
                    {{ clickItem.data.record_cost }}{{ currency }}
                  </span>
                  <el-input-number v-if="isEdit == true" :precision="2" v-model="item.record_cost" :min="0"
                    controls-position="right" />
                </dd>
              </div>

              <div class="
                  bg-gray-50
                  px-4
                  py-3
                  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                ">
                <dt class="text-sm font-medium text-gray-500">
                  <span :class="{
                    'text-gray-500': true,
                  }">类型</span>
                </dt>

                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span :class="{
                    'text-blue-700': clickItem.data.is_income == 0,
                    'text-green-700': clickItem.data.is_income == 1,
                  }" v-if="isEdit == false">
                    {{
                        is_income_record_type[item.is_income].value[
                          clickItem.data.record_type
                        ].label
                    }}
                  </span>
                  <el-select v-model="clickItem.data.record_type" placeholder="请选择类型" v-if="isEdit == true">
                    <el-option v-for="item in is_income_record_type[item.is_income]
                    .value" :key="item" :label="item.label" :value="item.value" />
                  </el-select>
                </dd>
              </div>

              <!-- place -->
              <div class="
                  bg-white
                  px-4
                  py-3
                  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                ">
                <dt class="text-sm font-medium text-gray-500">
                  <span :class="{
                    'text-gray-500': true,
                  }">于何处消费</span>
                </dt>

                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span v-if="isEdit == false" :class="{
                    'text-blue-700': clickItem.data.is_income == 0,
                    'text-green-700': clickItem.data.is_income == 1,
                  }">
                    {{ clickItem.data.record_place }}
                  </span>
                </dd>
              </div>

              <div class="
                  bg-gray-50
                  px-4
                  py-3
                  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                ">
                <dt class="text-sm font-medium text-gray-500">备注</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" v-if="isEdit == false" :class="{
                  'text-blue-700': clickItem.data.is_income == 0,
                  'text-green-700': clickItem.data.is_income == 1,
                }">
                  {{ clickItem.data.record_content }}
                </dd>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" v-if="isEdit == true">
                  <el-input v-if="isEdit == true" v-model="clickItem.data.record_content" type="textarea" :rows="3" />
                </dd>
              </div>

              <div class="
                  bg-white
                  px-4
                  py-3
                  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                ">
                <dt class="text-sm font-medium text-gray-500">操作</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul role="list" class="
                      border border-gray-200
                      rounded-md
                      divide-y divide-gray-200
                    ">
                    <li class="
                        pl-3
                        pr-4
                        py-3
                        flex
                        items-center
                        justify-between
                        text-sm
                        bg-white
                      ">
                      <div class="w-0 flex-1 flex items-center">
                        <span class="ml-2 flex-1 w-0 truncate">
                          <a href="#" class="font-medium" :class="{
                            'text-blue-700': clickItem.data.is_income == 0,
                            'text-green-700': clickItem.data.is_income == 1,
                          }" @click="editItem(clickItem.data)" v-if="isEdit == false">
                            Change
                          </a>
                          <a href="#" class="font-medium" :class="{
                            'text-blue-700': clickItem.data.is_income == 0,
                            'text-green-700': clickItem.data.is_income == 1,
                          }" @click="submitChange(clickItem.data)" v-if="isEdit == true">
                            Submit
                          </a>
                          <a href="#" class="
                              font-medium
                              text-gray-600
                              hover:text-gray-500
                            " @click="isEdit = false" v-if="isEdit == true">
                            | Back
                          </a>
                        </span>
                      </div>
                    </li>
                    <li class="
                        pl-3
                        pr-4
                        py-3
                        flex
                        items-center
                        justify-between
                        text-sm
                        bg-white
                      ">
                      <div class="w-0 flex-1 flex items-center">
                        <span class="ml-2 flex-1 w-0 truncate">
                          <a href="#" class="font-medium" :class="{
                            'text-blue-700': clickItem.data.is_income == 0,
                            'text-green-700': clickItem.data.is_income == 1,
                          }" @click="deleteItem(clickItem.data.id)">
                            Delete
                          </a>
                        </span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { defineProps, reactive, toRefs, ref } from "vue";
import { items, totalAll, getCurDate } from "@/store/cost_list";

axios.defaults.baseURL = "midolii.com"
const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      is_income: 0,
      record_date_year: "",
      record_date_month: "",
      record_date_day: "",
      record_date_hour: "",
      record_place: "",
      record_cost: "",
      record_date_full: getCurDate(),
    }),
  },
});
const currency = ref("￥");
const { item } = toRefs(props);

const clickItem = reactive({
  flag: 0,
  data: null,
});
const is_income_record_type = {
  0: {
    label: "支出",
    value: [
      { label: "给他人转账", value: 0 },
      { label: "交通出行", value: 1 },
      { label: "日用品", value: 2 },
      { label: "网上购物", value: 3 },
      { label: "休闲娱乐", value: 4 },
      { label: "餐饮", value: 5 },
      { label: "生活服务缴费", value: 6 },
      { label: "其他", value: 7 },
    ],
  },
  1: {
    label: "收入",
    value: [
      { label: "他人转账", value: 0 },
      { label: "工资收入", value: 1 },
    ],
  },
};
const tempItem = reactive([]);
const localEmail = ref(localStorage.email);
const localUsername = ref(localStorage.username);
const popup = (i) => {
  clickItem.flag = 1;
  clickItem.data = i;
  clickItem.data.record_date_full =
    i.record_date_year + "-" + i.record_date_month + "-" + i.record_date_day;
  clickItem.data.record_hour = new Date(
    i.record_date_year,
    i.record_date_month - 1,
    i.record_date_day,
    i.record_date_hour.slice(0, 2),
    i.record_date_hour.slice(3, 5),
    i.record_date_hour.slice(6, 8)
  );
  tempItem[0] = clickItem.data;
};
const isEdit = ref(false);
const editItem = () => {
  isEdit.value = true;
};

const submitChange = (data) => {
  console.log(data);
  let hh, mm, ss;
  if (data.record_hour.getHours() < 10) {
    hh = "0" + data.record_hour.getHours();
  } else {
    hh = data.record_hour.getHours();
  }
  if (data.record_hour.getMinutes() < 10) {
    mm = "0" + data.record_hour.getMinutes();
  } else {
    mm = data.record_hour.getMinutes();
  }
  if (data.record_hour.getSeconds() < 10) {
    ss = "0" + data.record_hour.getSeconds();
  } else {
    ss = data.record_hour.getSeconds();
  }
  const reqBody = {
    id: data.id,
    userid: localStorage.userid,
    is_income: data.is_income,
    record_cost: data.record_cost,
    record_type: data.record_type,
    record_date_year: data.record_date_full.slice(0, 4),
    record_date_month: data.record_date_full.slice(5, 7),
    record_date_day: data.record_date_full.slice(8, 10),
    record_date_hour: hh + ":" + mm + ":" + ss,
    record_place: data.record_place,
    record_date_full: data.record_date_full,
    record_content: data.record_content,
  };
  console.log(reqBody);
  axios.post("/recordAction/updateRecord", reqBody).then((res) => {
    if (res.data.status == 1) {
      items.data.forEach((i) => {
        if (i.id == reqBody.id) {
          i.record_date_day = reqBody.record_date_day;
          i.record_date_month = reqBody.record_date_month;
          i.record_date_year = reqBody.record_date_year;
          i.record_date_hour = reqBody.record_date_hour;
          i.is_income = reqBody.is_income;
          i.record_cost = reqBody.record_cost;
          i.record_type = reqBody.record_type;
          i.record_date_full = reqBody.record_date_full;
          i.record_place = reqBody.record_place;
          i.record_content = reqBody.record_content;
        }
        items.flashList();
        totalAll.day_total = Number(items.flashTotal()).toFixed(2);
        totalAll.week_total = Number(items.flashWeekTotal()).toFixed(2);
        totalAll.month_total = Number(items.flashMonthTotal()).toFixed(2);
        totalAll.month_total_in = Number(items.flashMonthInTotal()).toFixed(2);
        totalAll.week_total_in = Number(items.flashWeekInTotal()).toFixed(2);
        totalAll.day_total_in = Number(items.flashInTotal()).toFixed(2);
        return;
      });
    }
    isEdit.value = false;
  });
};

const deleteItem = (id) => {
  const reqBody = {
    id,
    userid: localStorage.userid,
  };
  axios
    .post("/recordAction/deleteRecord", reqBody)
    .then((res) => {
      if (res.data.status == 1) {
        ElMessage.success({
          message: res.data.content.msg,
          duration: 2000,
        });
        closePopupWindow();
        setTimeout(() => {
          items.data.forEach((i) => {
            if (i.id == id) {
              items.data.splice(items.data.indexOf(i), 1);
            }
          });
          totalAll.day_total = Number(items.flashTotal()).toFixed(2);
          totalAll.week_total = Number(items.flashWeekTotal()).toFixed(2);
          totalAll.month_total = Number(items.flashMonthTotal()).toFixed(2);
        }, 300);
      }
    })
    .catch(() => {
      ElMessage.error({
        message: "网络错误",
        duration: 2000,
      });
    });
};
const closePopupWindow = () => {
  clickItem.flag = 0;
  isEdit.value = false;
};
const toggleCostType = (is_income) => {
  if (is_income == 0) {
    item.value.is_income = 1;
  } else {
    item.value.is_income = 0;
  }
};
</script>

<style lang="scss" scoped>
.item_card {
  margin: 5px 12px 10px 12px;
  display: flex;
  align-items: center;

  //
  .cost_type {
    margin: 4px 10px;

    svg {
      height: 32px;
      width: 32px;
    }
  }

  //
  .hr_col {
    height: 28px;
    width: 2px;
    border-radius: 4px;
    background-color: #e5e5e5;
  }

  //
  .cost_info {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    font-size: 0.9rem;

    //
    div {
      margin: 2px 10px;
    }

    .first_line {
      font-weight: bold;
      display: flex;
    }

    //
    .second_line {
      display: flex;
      font-size: 1rem;
      text-align: left;
      justify-content: space-between;

      span {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        max-width: 160px;
      }
    }
  }
}

.flex_auto {
  flex: 1 1 auto;
}

.font-bold {
  font-weight: bold;
}

.font-12 {
  font-size: 1.2rem;
}

.font-14 {
  font-size: 1.4rem;
}

.income {
  color: #00a65a;
}

.cost {
  //blue
  color: #0073b7;
}

.font-color-000-06 {
  color: rgba(0, 0, 0, 0.6);
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup_window {
    width: 300px;
    background: #fff;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .time {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item_main {
      margin: 10px 0;
    }
  }
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
</style>
