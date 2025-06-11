// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },

  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'prettier',
    'jest',
  ],

  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_'
      }
    ],
    'react-native/no-inline-styles': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-undef': 'off',
    'no-extra-boolean-cast': 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  ignorePatterns: [
    'node_modules/',
    'build/',
    'dist/',
    'android/',
    'ios/',
    'coverage/',
    '.expo/',
    '*.js',
  ],

  overrides: [
    {
      files: ['*.ts', '*.tsx'
      ],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'
      ],
      rules: {},
    },
  ],
};