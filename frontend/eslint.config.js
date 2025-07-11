import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // ⛔️ Ignore build/system folders
  {
    ignores: ['dist', 'node_modules'],
  },

  // ✅ Apply ESLint rules to JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 🧹 Custom Rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Optional: Clean imports (add if using eslint-plugin-import)
      // "import/order": [
      //   "warn",
      //   {
      //     "groups": ["builtin", "external", "internal"],
      //     "alphabetize": { "order": "asc", "caseInsensitive": true }
      //   }
      // ]
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
