import globals from 'globals'

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
    },
  },
]
