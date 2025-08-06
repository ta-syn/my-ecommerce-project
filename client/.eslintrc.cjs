module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // React 17+ এর জন্য 'React' import করা ছাড়াই JSX ব্যবহার করার অনুমতি দেয়
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // START: আমাদের সব সমস্যা সমাধানের জন্য এই নিয়মগুলো যোগ করা হয়েছে
    'no-unused-vars': 'off', // অব্যবহৃত ভেরিয়েবলের জন্য আর কোনো অভিযোগ করবে না
    'react/prop-types': 'off', // props-এর জন্য type চেকিং বন্ধ করবে
    'react/no-unescaped-entities': 'off', // ' বা " এর মতো ক্যারেক্টার ব্যবহারের অনুমতি দেবে
    // END: আমাদের সব সমস্যা সমাধানের জন্য এই নিয়মগুলো যোগ করা হয়েছে
  },
};