import { format, isValid } from 'date-fns';
import { ComponentOptions } from 'vue';
import { Vue } from 'vue/types/vue';
declare module 'vue-router/types/router' {
  interface VueRouter {
    history: any;
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    form: object;
    page: {
      pageNum: number;
      pageSize: number;
      layout: string;
      [key:string]:any;
    };
    pageTotal: number;
    onFormatTime: (val: number, formatString?: string) => string;
    onTimer: (func: Function, time?: number) => number;
    clearTimer: (timer: number) => void;
  }
}
interface Mixins {
  [key: string]: ComponentOptions<Vue> | any;
}

/**
 * 时间格式化
 * @param val 时间值
 * @param formatString 格式
 */
const dateFormat = {
  methods: {
    onFormatTime(val: number, formatString = 'YYYY-MM-DD HH:mm:ss') {
      if (val && isValid(new Date(val))) {
        return format(val, formatString);
      }
      return '- -';
    },
  },
};

/**
 * 分页属性
 */
const pageData = {
  data() {
    let page: {
      pageNum: number,
      pageSize: number,
      [key: string]: any
    } = {
      pageNum: 1,
      pageSize: 10,
    }
    return {
      page,
      pageTotal: 0,
    };
  },
};


export const mixins: Mixins = {
  dateFormat,
  pageData,
};
