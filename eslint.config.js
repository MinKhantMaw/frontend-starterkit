import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['src/**/*.{ts,vue}'],
    plugins: { vue, '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, ecmaVersion: 'latest', sourceType: 'module', extraFileExtensions: ['.vue'] },
    },
    rules: {
      'vue/no-mutating-props': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/require-v-for-key': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
]
