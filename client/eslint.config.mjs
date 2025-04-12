import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      indent: [
        'off',
        'spaces',
        2
      ],
      'linebreak-style': [
        'off',
        'windows'
      ],
      quotes: [
        'warn',
        'single'
      ],
      semi: [
        'warn',
        'never'
      ],
      curly: [
        'warn',
        'multi-line'
      ],
      eqeqeq: 'off',
      'no-trailing-spaces': 'warn',
      'no-multiple-empty-lines': 'off',
      'no-inline-comments': 'off',
      'no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'prefer-const': 'off',
      'import/prefer-default-export': 'off',
      'no-inner-declarations': 'off',
      'no-empty-pattern': 'off',
      'no-prototype-builtins': 'off',
      camelcase: 'warn',
      'no-tabs': [
        'error',
        {
          allowIndentationTabs: true
        }
      ],
      'prettier/prettier': [
        'off',
        {
          endOfLine: 'auto'
        }
      ],
      'no-async-promise-executor': 'off',
      'no-constant-condition': 'warn',
      'no-empty': 'warn',
      'no-unused-expressions': [
        'warn',
        {
          allowTaggedTemplates: true
        }
      ]
    }
  }
]

export default eslintConfig
