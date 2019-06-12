export type Reg = { [index: string]: RegExp };
/**
 *
 * @desc 正则表达式集中管理
 * @export
 * @class Validate
 */
export class Validate {
  // 内置正则表达式
  public static readonly nativeRegs: Reg = {
    url: /^((f|ht){1}(tp|tps):\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/,
    ip: /^((25[0-5]|2[0-4]\d|[1]{1}\d{1}\d{1}|[1-9]{1}\d{1}|\d{1})($|(?!\.$)\.)){4}$/,
    name2To64: /^[\u4E00-\u9FA5\w\d]{2,64}$/,
    telephone: /^\d{11}$/,
    emails: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  };
  private static validateInstance: Validate;
  private container: Reg;

  /**
   *Creates an instance of Validate.
   * @param {Reg} options
   * @memberof Validate
   */
  private constructor(options: Reg) {
    this.container = {
      ...Validate.nativeRegs,
      ...options,
    };
  }

  /**
   *
   *
   * @static
   * @param {Reg} options
   * @returns {Validate}
   * @memberof Validate
   */
  public static getValidate(options: Reg = {}): Validate {
    return (
      Validate.validateInstance ||
      (Validate.validateInstance = new Validate(options))
    );
  }

  /**
   *
   *
   * @param {string} key
   * @returns {RegExp}
   * @memberof Validate
   */
  public get(key: string): RegExp {
    return this.container[key];
  }

  /**
   *
   *
   * @param {string} key
   * @param {RegExp} reg
   * @memberof Validate
   */
  public set(key: string, reg: RegExp): void {
    this.container[key] = reg;
  }

  /**
   *
   *
   * @param {string} type
   * @param {string} value
   * @returns {boolean}
   * @memberof Validate
   */
  public test(type: string, value: string): boolean {
    return this.container[type] && this.container[type].test(value);
  }
}
type Options = { pwdStr: string; oldPwdStr?: string; account?: string };
// 用于密码强度校验
export const passwordCheck = (options: Options): string | boolean => {
  let { pwdStr, oldPwdStr, account } = options;
  // 不能使用旧密码
  if (oldPwdStr && oldPwdStr === pwdStr) {
    return '新密码与旧密码不能相同';
  }

  // 密码长度至少有 8 位
  if (!/.{8,}/.test(pwdStr)) {
    return '密码长度至少为8位';
  }

  // 密码不得包含三个或三个以上来自帐号中的字符
  if (account) {
    let num = 0;
    account.split('').forEach(val => {
      if (pwdStr.indexOf(val) > -1) num++;
    });
    if (num >= 3) {
      return `密码不得包含三个及以上来自帐号中的字符`;
    }
  }
  // 密码至少包含以下 5类字符中的 3 类字符
  let matchNum = 0;

  ['[A-Z]', '[a-z]', '[0-9]', '[~!@#$%^&*()]', '[\u4E00-\u9FA5]'].forEach(
    (str: string) => {
      if (new RegExp(str).test(pwdStr)) matchNum++;
    },
  );

  if (matchNum < 3) {
    return `密码至少包含大小写、数字以及特殊字符等3种不同类型的字符`;
  }
  return false;
};
