module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier', // Prettier-এর সাথে conflict করে এমন rule গুলো বন্ধ করে
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'warn', // prop-types না থাকলে শুধু warning দেবে, error নয়
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn', // ব্যবহার না করা ভেরিয়েবলের জন্য warning
  },
};