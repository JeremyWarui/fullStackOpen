import globals from 'globals'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    root: true,
    env: {
      browser: true,
      es2020: true,
      'jest/globals': true,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginReact.configs.flat.recommended,
]
