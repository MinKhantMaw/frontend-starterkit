import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import js from '@eslint/js'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,vue}'],
    plugins: { vue },
    languageOptions: {
      parser: vueParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', extraFileExtensions: ['.vue'] },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        CustomEvent: 'readonly',
        File: 'readonly',
        Event: 'readonly',
        HTMLInputElement: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'vue/no-mutating-props': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/require-v-for-key': 'error',
    },
  },
]
