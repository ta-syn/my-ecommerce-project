module.exports = {
  env: {
    commonjs: true,          // CommonJS modules (require/exports)
    es2021: true,            // ES2021 ফিচার সাপোর্ট
    node: true,              // Node.js গ্লোবালস সাপোর্ট
    jest: true,              // Jest টেস্টিং এনভায়রনমেন্ট সাপোর্ট
  },
  extends: [
    'eslint:recommended',    // Recommended ESLint রুলস
    'plugin:node/recommended', // Node-specific রুলস
    'prettier',              // Prettier এর সাথে কম্প্যাটিবিলিটি
  ],
  parserOptions: {
    ecmaVersion: 'latest',   // সর্বশেষ ECMAScript ফিচার সাপোর্ট
  },
  rules: {
    // অপ্রয়োজনীয় ভ্যারিয়েবল থাকলে warning দেবে, কিন্তু next ফাংশনের জন্য ignore করবে
    'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],

    // Import/export ES Modules ব্যবহার করার জন্য Node plugin এর warning বন্ধ
    'node/no-unsupported-features/es-syntax': 'off',

    // path resolving নিয়ে warning বন্ধ — আমরা নিজেরা ঠিকঠাক path handle করব
    'node/no-missing-require': 'off',
  },
};
