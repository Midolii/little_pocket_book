import {
  reactive,ref
} from "vue";

const getCurDay = () => {
  let str = `${new Date().getFullYear()}`

  const month = new Date().getMonth() + 1
  if (month < 10) {
    str += `-0${month}`
  } else {
    str += `-${month}`
  }
  const day = new Date().getDate()
  if (day < 10) {
    str += `-0${day}`
  } else {
    str += `-${day}`
  }
  return str
}

const getCurDate = () => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds())
}

const temp = {
  userid: localStorage.userid,
  record_cost: 0,
  record_type: "",
  record_date_year: "",
  record_date_month: "",
  record_date_day: "",
  record_date_hour: getCurDate(),
  record_date_full: getCurDay(),
  record_place: "",
  record_content: "",
}

const cost = reactive(temp)

const sameWeek = (day) => { //当前日期 
  let sameWeek = false;
  let time = new Date();
  let ye = time.getFullYear();
  let mo = time.getMonth() + 1;
  let da = time.getDate();
  let week = time.getDay();
  let beforeWeek = day;
  let nextWeek = new Date(`${ye}-${mo}-${da} 00:00:00`).getTime() - week * 24 * 60 * 60 * 1000;
  beforeWeek > nextWeek ? sameWeek = true : sameWeek = false;
  return sameWeek; //返回是否本周;
}

const items = reactive({
  data: [],
  flashTotal: () => {
    let today = new Date().getDate();
    if (today < 10) {
      today = '0' + today
    }
    const day = today
    return items.data.reduce((a, b) => {
      if (b.record_date_day != day) {
        return a;
      }
      return Number(a) + Number(b.record_cost);
    }, 0);
  },
  flashWeekTotal: () => {
    return items.data.reduce((a, b) => {
      if (!sameWeek(new Date(b.record_date_year, b.record_date_month - 1, b.record_date_day,0,0,0).getTime())) {
        return a;
      }
      return Number(a) + Number(b.record_cost);
    }, 0);
  },
  flashMonthTotal: () => {
    const curMonth = new Date().getMonth() + 1
    return items.data.reduce((a, b) => {
      if (b.record_date_month != curMonth) {
        return a;
      }
      return Number(a) + Number(b.record_cost);
    }, 0);
  },
  flashList: () => {
    const res = items.data.sort((a, b) => {
      const date1 = new Date(
        a.record_date_year,
        a.record_date_month,
        a.record_date_day,
        a.record_date_hour.toString().slice(0, 2),
        a.record_date_hour.toString().slice(3, 5),
        a.record_date_hour.toString().slice(6, 8)
      );
      const date2 = new Date(
        b.record_date_year,
        b.record_date_month,
        b.record_date_day,
        b.record_date_hour.toString().slice(0, 2),
        b.record_date_hour.toString().slice(3, 5),
        b.record_date_hour.toString().slice(6, 8)
      );
      if (date1.getTime() > date2.getTime()) {
        return -1;
      } else {
        return 1;
      }
    });
    // items.flashTotal()
    return res
  }
});

const totalAll = reactive({
  day_total: 0,
  month_total: 0,
  week_total: 0
})

const currentSelect = ref([]);

export {
  cost,
  items,
  getCurDate,
  getCurDay,
  totalAll,
  sameWeek,
  currentSelect
}
