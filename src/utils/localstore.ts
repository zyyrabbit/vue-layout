
export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  let r = ''
  try {
    r = JSON.parse(localStorage.getItem(key) as string);
  } catch (e) {
  }
  return r
};

export const setSessionItem = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = (key: string) => {
  let r = ''
  try {
    r = JSON.parse(sessionStorage.getItem(key) as string);
  } catch (e) {
  }
  return r
};

export default {
  setItem,
  getItem,
  setSessionItem,
  getSessionItem,
};
