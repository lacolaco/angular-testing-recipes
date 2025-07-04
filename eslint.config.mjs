import { defineConfig, globalIgnores } from 'eslint/config';
import html from '@html-eslint/eslint-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['projects/**/*']),
  {
    files: ['**/*.ts'],

    extends: compat.extends(
      'plugin:prettier/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
    ),

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: compat.extends(),

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.component.html'],

    extends: compat.extends('plugin:prettier/recommended', 'plugin:@angular-eslint/template/recommended'),

    rules: {},
  },
  {
    files: ['**/*.css'],
    extends: compat.extends('plugin:prettier/recommended'),
    rules: {},
  },
  {
    files: ['**/*.html'],
    ignores: ['**/*.component.html'],
    extends: compat.extends('plugin:prettier/recommended'),
    plugins: {
      html,
    },
    language: 'html/html',
    rules: {},
  },
]);
