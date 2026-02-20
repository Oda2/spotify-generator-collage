import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        global: 'readonly',
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        MessageEvent: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      'no-invalid-regexp': 'warn',
      'unicode-bom': ['warn', 'never'],
      'no-var': 'warn',
      'no-dupe-else-if': 'warn',
      'no-extra-semi': 'warn',
      'use-isnan': 'warn',
      indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
      quotes: [1, 'single'],
      semi: ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      curly: ['error', 'all'],
      'jsx-quotes': ['error', 'prefer-double'],
      'react/jsx-curly-brace-presence': 'error',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-deprecated': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'warn',
      'no-useless-escape': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/setupTests.{js,ts}'],
    languageOptions: {
      globals: {
        afterEach: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        vi: 'readonly',
      },
    },
  },
  {
    ignores: ['build/', 'node_modules/', 'dist/', 'coverage/'],
  },
];
