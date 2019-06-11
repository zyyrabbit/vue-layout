import http from 'axios';
import { Message, MessageBox } from 'element-ui';

http.defaults.withCredentials = true; //需配合cors

const commonConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
    'If-modified-Since': 0,
    'Cache-Control': 'nocache',
  },
};
//公用，勿删
const _rawHttp = http.create({
  ...commonConfig,
});

 [_rawHttp].forEach(http => {
  http.interceptors.request.use();

  http.interceptors.response.use(
    response => {
      if (response.data.code !== 0) {
        Message.error(response.data.msg);
        return Promise.reject(response.data.msg);
      }
      return response;
    },
    error => {
      const status = error.response.status;
      if (401 === status) {
        location.href = process.env.NODE_ENV === 'production' ? '/' : '/auth';
      } else if (403 === status) {
        Message({
          message: '当前用户无权限访问该资源',
          type: 'warning',
        });
      } else if (402 === status) {
        MessageBox.alert('会话已过期, 请重新登录!', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: false,
          callback: _ => {
            setTimeout(() => {
              MessageBox.close();
              location.href =
                process.env.NODE_ENV === 'production' ? '/' : '/auth';
            }, 0);
          },
        });
      } else {
        const data = error.response.data || {};
        const msg = data.message || error.message;
        Message.error(
          (error.response.data && error.response.data.msg) || `服务器异常`,
        );
        return Promise.reject(error);
      }
    },
  );
});

export default _rawHttp;
