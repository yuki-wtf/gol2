/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:react/jsx-runtime',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'eslint-config-prettier',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-invalid-void-type': ['off'],
    '@typescript-eslint/no-unsafe-member-access': ['off'],
    "@typescript-eslint/no-unsafe-assignment": ["off"],
    "@typescript-eslint/no-unsafe-call": ["off"],
    "@typescript-eslint/no-unsafe-argument": ["off"],
  },
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  settings: {
    jest: {
      version: 27,
    },
  },
}
