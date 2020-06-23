// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-tabs': 0,
    'indent': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止函数括号之前校验空格
    'space-before-function-paren': 0,
    // 禁止块之前校验空格
    'padded-blocks': 0,
    // 不允许扩展JS基本对象
    'no-extend-native': 0,
    'no-trailing-spaces': 0,
    'handle-callback-err': 0,
    // 强制将变量一起声明或单独声明
    'one-var': 1,
    'no-new': 0,
    // 清除无效转义字符
    'no-useless-escape': 1,
    // 允许声明未赋值的变量
    'no-unused-vars': 1,
    'indent': 0,
    'quotes': 0,
    'camelcase': 0,
    'no-undef': 1,
    'object-property-newline': 0,
    'eqeqeq': 0,
    'key-spacing': 0,
    'operator-linebreak': 1,
    'no-caller': 0,
    'no-multi-spaces': 0,
    'space-unary-ops': 0,
    "no-control-regex": 0,
    // 强制 typeof 表达式与有效的字符串进行比较
    "valid-typeof": 1,
    // 禁止对 function 声明重新赋值
    "no-func-assign": 1,
    // 禁止条件表达式中出现赋值操作符
    "no-cond-assign": 1,
    // 禁止在条件中使用常量表达式
    "no-constant-condition": 1,
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 1,
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": 1,
    // 禁止出现重复的 case 标签
    "no-duplicate-case": 1,
    // 禁止出现空语句块
    "no-empty": 1,
    // 禁止不必要的布尔转换
    "no-extra-boolean-cast": 1,
    // 禁止不必要的括号
    "no-extra-parens": 1,
    //分号检查
    'semi': 0,
    // 禁止不必要的分号
    "no-extra-semi": 1,
    // 禁止在嵌套的块中出现变量声明或 function 声明
    "no-inner-declarations": 1,
    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    "no-invalid-regexp": 1,
    // 禁止不规则的空白
    "no-irregular-whitespace": 1,
    // 禁止把全局对象作为函数调用
    "no-obj-calls": 1,
    // 禁止直接调用 Object.prototypes 的内置属性
    "no-prototype-builtins": 1,
    // 禁用稀疏数组
    "no-sparse-arrays": 1,
    // 禁止出现令人困惑的多行表达式
    "no-unexpected-multiline": 1,
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unreachable": 1,
    // 禁止对关系运算符的左操作数使用否定操作符
    "no-unsafe-negation": 1,
    // 要求使用 isNaN() 检查 NaN
    "use-isnan": 1
  }
}
