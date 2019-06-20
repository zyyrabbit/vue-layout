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

export const mixins: Mixins = {
  dateFormat,
};
