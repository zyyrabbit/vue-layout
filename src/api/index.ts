import http from 'axios';
import { Message } from 'element-ui';

http.defaults.withCredentials = true; //需配合cors

const commonConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
    'If-modified-Since': 0,
    'Cache-Control': 'nocache',
  },
};

const inst = http.create({
  ...commonConfig,
});

export default inst;
