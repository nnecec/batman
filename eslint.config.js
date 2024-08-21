import tseslint from 'typescript-eslint'

import nnecec from '@nnecec/eslint-config'

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...tseslint.configs.recommended,
  ...nnecec({
    react: true,
    tailwindcss: true,
    typescript: true,
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'src-tauri/**'],
  },
)
