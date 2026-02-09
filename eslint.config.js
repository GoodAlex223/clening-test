// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['*.config.{js,mjs,ts}', '*.config.*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'coverage/',
      'playwright-report/',
      'test-results/',
    ],
  },
]
