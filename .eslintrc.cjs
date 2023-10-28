module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    // "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"],
    // project: "./tsconfig.json",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "linebreak-style": ["error", "unix"],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/indent": "off",
    semi: "off",
    quotes: ["error", "double"],
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    "arrow-parens": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-indent": "off",
    "import/no-named-as-default-member": "off",
    "no-console": "off",
    "vue/multi-word-component-names": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": "off",
    // "@typescript-eslint/no-misused-promises": [
    //   2,
    //   {
    //     checksVoidReturn: { attributes: false },
    //   },
    // ],
    // "@typescript-eslint/no-floating-promises": [
    //   2,
    //   {
    //     ignoreVoid: true,
    //   },
    // ],
    // "no-void": "off",
  },
};
