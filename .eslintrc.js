// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    "no-tabs": 0,
    "indent": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-console": 2,
    // 禁止函数括号之前校验空格
    "space-before-function-paren": 0,
    // 禁止块之前校验空格
    'prefer-rest-params': 1, //要求使用剩余参数而不是 arguments
    "padded-blocks": 0,
    // 不允许扩展JS基本对象
    "no-extend-native": 0,
    "no-trailing-spaces": 0,
    "handle-callback-err": 0,
    // 强制将变量一起声明或单独声明
    "one-var": 1,
    "no-new": 0,
    // 清除无效转义字符
    "no-useless-escape": 1,
    // 允许声明未赋值的变量
    "no-unused-vars": 1,
    "indent": 0,
    "quotes": 0,
    "camelcase": 0,
    "no-undef": 1,
    "object-property-newline": 0,
    "eqeqeq": 0,
    "key-spacing": 0,
    "operator-linebreak": 1,
    "no-mixed-spaces-and-tabs": 0,
    "no-caller": 0,
    "no-multi-spaces": 0,
    "space-unary-ops": 0,
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
    "semi": 0,
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
    "use-isnan": 1,
    "no-redeclare": 1, //禁止多次声明同一变量
    "no-use-before-define": 1, //禁止在变量定义之前使用它们
    "vue/max-attributes-per-line": [1, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    // 在标签的右括号之前要求或不允许换行
    "vue/html-closing-bracket-newline": [
      "2",
      {
        "singleline": "never", // 单行元素： 禁止在右括号前换行
        "multiline": "never" // 多行元素：禁止在右括号前换行
      }
    ],
    // template模板中属性排序
    "vue/attributes-order": 1,
    "vue/html-indent": 0,
    // 标记单行文本属性数值不得超过10个
    "vue/max-attributes-per-line": 0,
    // 关闭半闭合标签
    "vue/html-self-closing": [0],
    // 在标签的右括号之前要求或不允许换行
    "vue/html-closing-bracket-newline": 0,
    // 单个html元素内容换行符
    "vue/singleline-html-element-content-newline": 0,
    // 多个html元素内容换行符
    "vue/multiline-html-element-content-newline": 0,
    // 使用大驼峰式注册组件
    "vue/name-property-casing": [2, "PascalCase"],
    "vue/html-closing-bracket-spacing": 0,
    // 禁止使用v-html
    "vue/no-v-html": 2,
    // 设置对象一定具备getter属性
    "accessor-pairs": 2,
    // 设置箭头函数前后都要有一个空格
    "arrow-spacing": [2, {
      "before": true, // 前面空格
      "after": true // 后面空格
    }],
    // 代码块内部设置前后空格: right: { a: 12 }  error: {a: 12} 
    "block-spacing": [2, "always"],
    // 强制执行 if else switch 等一个大括号风格1tbs，
    "brace-style": [2, "1tbs", {
      "allowSingleLine": true // 允许单行写法: if (...) else {...} 
    }],
    // 变量命名规则，纯小写字符
    "camelcase": [0, {
      "properties": "always"
    }],
    // 禁止在对象中最后一个属性添加逗号
    "comma-dangle": [2, "never"],
    // 逗号前后配置空格
    "comma-spacing": [2, {
      "before": false, // 逗号前不允许有空格
      "after": true // 逗号后允许有空格
    }],
    // 在数组元素，对象属性或变量声明的同一行之后和同一行需要逗号
    "comma-style": [2, "last"],
    // 派生类构造器必须使用super
    "constructor-super": 2,
    // if 语句配置花括号: 允许不加花括号
    "curly": [2, "multi-line"],
    // 在成员表达式中的"点"之前或之后放置换行符: 允许
    // a
    // .b
    // 情况
    "dot-location": [2, "property"],
    // 文件最后一行追加一行空白
    "eol-last": 2,
    // 全等匹配
    "eqeqeq": [2, "always", { "null": "ignore" }],
    // generator生成器*配置空格
    "generator-star-spacing": [2, {
      "before": true,
      "after": true
    }],
    "handle-callback-err": [2, "^(err|error)$"],
    "indent": 0,
    "no-unused-vars": 0,
    "jsx-quotes": 0,
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": [2, {
      "before": true,
      "after": true
    }],
    "new-cap": [2, {
      "newIsCap": true,
      "capIsNew": false
    }],
    "new-parens": 2,
    "no-array-constructor": 2,
    "no-caller": 2,
    "no-console": "off",
    "no-class-assign": 2,
    "no-cond-assign": 2,
    "no-const-assign": 2,
    "no-control-regex": 0,
    "no-delete-var": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-empty-pattern": 2,
    "no-eval": 0,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": [2, "functions"],
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-func-assign": 2,
    "no-implied-eval": 2,
    "no-inner-declarations": [2, "functions"],
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-iterator": 2,
    "no-label-var": 2,
    // vue 父子传递参数，prop关闭设置type
    "vue/require-prop-types": 0,
    "no-labels": [2, {
      "allowLoop": false,
      "allowSwitch": false
    }],
    "no-lone-blocks": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-multiple-empty-lines": [2, {
      "max": 1
    }],
    "no-native-reassign": 2,
    "no-negated-in-lhs": 2,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-symbol": 2,
    "no-new-wrappers": 2,
    "no-obj-calls": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-path-concat": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-return-assign": [2, "except-parens"],
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-shadow-restricted-names": 2,
    "no-spaced-func": 2,
    "no-sparse-arrays": 2,
    "no-this-before-super": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-undef-init": 2,
    "no-unexpected-multiline": 2,
    "no-unmodified-loop-condition": 2,
    "no-unneeded-ternary": [2, {
      "defaultAssignment": false
    }],
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-unused-vars": [2, {
      "vars": "all",
      "args": "none"
    }],
    "no-useless-call": 2,
    "no-useless-computed-key": 2,
    "no-useless-constructor": 2,
    "no-useless-escape": 0,
    "no-whitespace-before-property": 2,
    "no-with": 2,
    "one-var": [2, {
      "initialized": "never"
    }],
    "operator-linebreak": [2, "after", {
      "overrides": {
        "?": "before",
        ":": "before"
      }
    }],
    "padded-blocks": [2, "never"],
    "quotes": 0,
    "space-before-function-paren": 0,
    "semi": 0,
    "semi-spacing": [2, {
      "before": false,
      "after": true
    }],
    "space-before-blocks": 0,
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": [2, {
      "words": true,
      "nonwords": false
    }],
    "spaced-comment": [2, "always", {
      "markers": ["global", "globals", "eslint", "eslint-disable", "*package", "!", ","]
    }],
    "template-curly-spacing": [2, "never"],
    "use-isnan": 2,
    "valid-typeof": 2,
    "wrap-iife": [2, "any"],
    "yield-star-spacing": [2, "both"],
    "yoda": [2, "never"],
    // 将声明变量强制使用const
    "prefer-const": 0,
    // "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "object-curly-spacing": 0,
    "array-bracket-spacing": [2, "never"]
  }
}
