// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // 添加这个 rules 配置
    rules: {
      // 未使用的变量改为警告
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off', // 关闭 JS 的规则，使用 TS 的
      '@typescript-eslint/no-explicit-any': 'warn',  // any 类型改为警告
      '@typescript-eslint/no-unsafe-function-type': 'warn',  // Function 类型改为警告
      '@typescript-eslint/no-empty-object-type': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn',  //useEffect里改state会导致级联渲染，影响性能

      // 可选：允许以下划线开头的变量未使用
      // '@typescript-eslint/no-unused-vars': [
      //   'warn',
      //   {
      //     argsIgnorePattern: '^_',
      //     varsIgnorePattern: '^_',
      //   }
      // ],
    },
  },
  ...storybook.configs["flat/recommended"]
])