module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-essential","./.eslintrc-auto-import.json",],
    plugins: ["vue"],
}
