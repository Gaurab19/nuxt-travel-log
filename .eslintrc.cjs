// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    // If you also use prettier in the project (even if disabled in IDE)
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Disable stylistic rules but still allow auto-fix
    "style/*": "off",
    "format/*": "off",
    "*-indent": "off",
    "*-spacing": "off",
    "*-spaces": "off",
    "*-order": "off",
    "*-dangle": "off",
    "*-newline": "off",
    "*quotes": "off",
    "*semi": "off",
  },
  overrides: [
    {
      files: [
        "*.js",
        "*.jsx",
        "*.ts",
        "*.tsx",
        "*.vue",
        "*.html",
        "*.md",
        "*.json",
        "*.yaml",
        "*.yml",
        "*.css",
        "*.scss",
        "*.less",
      ],
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
  ],
};
