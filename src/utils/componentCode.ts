import { 
  objForEach,
  getDataType,
  isString,
  deepCopy,
  dumpToHyphenate,
  
} from  '@/utils';

import {
  PageConfig,
  IComponentConfig,
} from '@/utils/index.d';

export function genTemplateStr(pageConfig: PageConfig) {
  let templateStr = `
    <div class="template">
      ${genTemplateCode(pageConfig.configs)}
    </div>`;
  // 简单处理删除一些代码
  templateStr = templateStr.replace(/:?[\w-_]+=(""|"0")/g, '');

  templateStr = templateStr.replace(/:(\w+)="([^"]*)"/g, (match, $1, $2) => {
    if (/false|true|[0-9]+/.test($2)) {
      return `:${$1}="${$2}"`;
    }
    return `:${$1}="${$1}"`;
  });
  return templateStr;
}

export function compileToOptions(pageConfig: PageConfig, templateStr: string) {
  const code = genJsStr(pageConfig, templateStr);

  const options = new Function(
    ` return {
      ${code}
    }`)();

  return options;
}

export function genJsStr(pageConfig: PageConfig, templateStr: string) {
  const varStr = dealTemplateVar(templateStr);
  const jsStr = `${pageConfig.jsCode}`;
  const options = new Function(
    ` return {
      ${jsStr}
    }`)();

  let data = options.data();
  data = {
    ...data,
    ...varStr
  }
  options.data = function() {
    return data
  }

  return jsStr;
}

export function genCssStr(pageConfig: PageConfig) {
  const cssCode = `
    ${pageConfig.cssCode}
    ${genStyleCode(pageConfig.configs) || ''}`;

  return cssCode;
}

function dealTemplateVar(templateStr: string) {
  const pattern = /:(\w+)="([^"]*)"/g;
  let ret,
      result = [];
  while((ret = pattern.exec(templateStr)) != null) {
    if (/false|true|[0-9]+/.test(ret[2])) continue;
    result.push(ret[1]);   
  };
  const valMap:any = {};
  result.forEach((key: string) => {
    valMap[key] = ''
  });
 
  return valMap;
}

function genStyleCode(configs: IComponentConfig[]) {
  let codeStr = '';
  configs.forEach((config: IComponentConfig) => {

    let { style } = config;

    // 处理class
    if (style && config.class) {
      codeStr += `.${config.class.split(' ')[0]} { ${genPropsOrAttrsStr(style, 'style')} }`;
    }

    if (config.children) {
      codeStr += genStyleCode(config.children as IComponentConfig[]);
    }

  })
  return codeStr;
}

function genTemplateCode(configs: IComponentConfig[]) {
  let codeStr = '';
  configs.forEach((config: IComponentConfig) => {
    // 文本元素
    if (isString(getDataType(config))) {
      codeStr += config;
      return;
    }
    // 处理元素html元素Dom
    if (config.type === 'html') {
      config = dealHtmlElement(config);
    }

    const { 
      name, 
      attrs, 
      props, 
      action,
      rule,
    } = config;
    let attrStr = attrs ? genPropsOrAttrsStr(attrs, 'attrs') : '';
    const propsStr = props ? genPropsOrAttrsStr(props, 'props', name) : '';
    const actionStr = action ? genPropsOrAttrsStr(action.map, 'action') : '';
    const ruleStr = rule ? genRuleStr(rule) : '';
    // 处理class
    if (config.class) {
      attrStr += ` class="${config.class.split(',').join(' ')}"`;
    }
    
    codeStr += `<${name}${propsStr}${ruleStr}${actionStr}${attrStr}>`;

    if (config.children) {
      codeStr += genTemplateCode(config.children as IComponentConfig[]);
    }

    codeStr += `</${name}>`
  })
  return codeStr;
}

// 生成表单规则

function genRuleStr(rule: any) {
  const {
    checked,
    map
  } = rule;
  let ruleStr = ':rules = "[';

  checked.forEach((key: string) => {
    
    ruleStr += `${map[key]},`
  })

  ruleStr += ']"';
  
  return ruleStr;
}

// 代码生成
function genPropsOrAttrsStr(obj: any, type: 'attrs' | 'props' | 'style' | 'action', compName?: string) {
  let str = '';
  objForEach(obj, (key, value) => {
    // 属性去掉config-id
    if (type === 'attrs' && key === 'config-id') return;

    if (type === 'attrs') {

      str += ` ${key}="${value}"`;

    } else if (type === 'props') {

      // TODO 待优化解决
      if (compName === 'el-input' && key==='value') {
        str += ` v-model="value"`;
      } else {
        str += ` :${key}="${value}"`;
      }

    } else if (type === 'action') {
        str += ` @${key}="${value}"`;

    } else if (type === 'style'){

      str += `${dumpToHyphenate(key)}:${value};`;

    } 
  })
  return str;
}

// 处理元素dom
function dealHtmlElement(config: IComponentConfig): IComponentConfig {
  let configCopy = deepCopy(config);
  
  configCopy.name = configCopy.attrs!.tag;
  if (configCopy.attrs!.text) {
    configCopy.children = [configCopy.attrs!.text];
  }
  configCopy.attrs = {};
  return configCopy;
}
