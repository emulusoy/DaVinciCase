
import js from '@eslint/js';
import ts from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: ts.parser,
    },
    plugins: { import: importPlugin, '@typescript-eslint': ts.plugin },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'import/order': ['warn', {
        groups: ['builtin','external','internal','parent','sibling','index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }],
    },
  },
];
