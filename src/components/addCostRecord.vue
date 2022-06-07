<template>
  <div class="add_record" @click="addRecord">Add</div>
  <el-dialog :width="w_90" v-model="dialogFormVisible" title="消费记录单">
    <el-form :model="cost">
      <el-form-item label="消费">
        <!-- <el-input
          v-model="form.record_cost"
          autocomplete="off"
          placeholder="消费金额 ¥"
        /> -->
        <el-input-number
          :precision="2"
          v-model="cost.record_cost"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="消费用途">
        <el-select v-model="cost.record_type" placeholder="请选择一种消费类型">
          <el-option label="给他人转账" value="0" />
          <el-option label="交通出行" value="1" />
          <el-option label="日用品" value="2" />
          <el-option label="网上购物" value="3" />
          <el-option label="休闲娱乐" value="4" />
          <el-option label="餐饮" value="5" />
          <el-option label="生活服务缴费" value="6" />
          <el-option label="其他" value="7" />
        </el-select>
      </el-form-item>
      <el-form-item label="地点">
        <el-input
          v-model="cost.record_place"
          autocomplete="off"
          placeholder="消费地点"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          :rows="3"
          type="textarea"
          v-model="cost.record_content"
          placeholder="备注"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="日期">
        <el-col :span="11">
          <el-date-picker
            v-model="cost.record_date_full"
            type="date"
            placeholder="选择日期"
            :disabled-date="disabledDate"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="cost.record_date_hour"
            placeholder="选择时间"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addRecordSubmit">确认添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import {
  cost,
  items,
  getCurDate,
  getCurDay,
  totalAll,
} from "@/store/cost_list";
import axios from "axios";
import { ElMessage } from "element-plus";

const dialogFormVisible = ref(false);
const w_90 = "90%";

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
const addRecord = () => {
  dialogFormVisible.value = true;
};
const addRecordSubmit = () => {
  const curDate = cost.record_date_hour.toString().slice(16, 24).split(":");
  cost.record_date_year = cost.record_date_full.toString().slice(0, 4);
  cost.record_date_month = cost.record_date_full.toString().slice(5, 7);
  cost.record_date_day = cost.record_date_full.toString().slice(8, 10);
  // console.log(curDate,cost.record_date_hour.getHours())
  const reqBody = {
    userid: localStorage.userid,
    record_cost: cost.record_cost,
    record_type: cost.record_type,
    record_place: cost.record_place,
    record_content: cost.record_content,
    record_date_year: cost.record_date_year,
    record_date_month: cost.record_date_month,
    record_date_day: cost.record_date_day,
    record_date_hour: `${curDate[0]}:${curDate[1]}:${curDate[2]}`,
  };
  axios.post("/recordAction/addRecord", reqBody).then((res) => {
    console.log(res);
    if (res.data.status == 1) {
      items.data.push({
        id: res.data.content.id,
        record_cost: cost.record_cost,
        record_type: cost.record_type,
        record_place: cost.record_place,
        record_content: cost.record_content,
        record_date_year: cost.record_date_year,
        record_date_month: cost.record_date_month,
        record_date_day: cost.record_date_day,
        record_date_hour: `${curDate[0]}:${curDate[1]}:${curDate[2]}`,
      });

      items.flashList();

      totalAll.day_total = Number(items.flashTotal()).toFixed(2);
      totalAll.week_total = Number(items.flashTotal(1)).toFixed(2);
      totalAll.month_total = Number(items.flashTotal(2)).toFixed(2);

      items.total += cost.record_cost;
      dialogFormVisible.value = false;
      cost.record_cost = 0.0;
      cost.record_type = "";
      cost.record_place = "";
      cost.record_content = "";
      cost.record_date_full = getCurDate();
      cost.record_date_hour = getCurDay();
      // console.log(getCurDate(), getCurDay());
      ElMessage.success("添加成功");
    }
  });
};
</script>

<style lang="scss" scoped>
.add_record {
  height: 42px;
  width: 42px;
  padding: 6px;
  opacity: 0.7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(255, 255, 255);
  box-shadow: 3px 3px 10px rgb(0 0 0 / 10%);
  z-index: 999;
  transition: opacity 0.3s ease;
}
.add_record:hover {
  opacity: 1;
  transition: opacity 0.3s ease;
}
.w-90 {
  width: 90% !important;
}
.el-select {
  width: 100%;
}
</style>
