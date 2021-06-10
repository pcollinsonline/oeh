module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  // Airbnb's ESLint config requires this
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Include .prettierrc.js rules
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': ['cypress/**'] }],
  },
  'settings': {
    'import/resolver': {
      'node': {
        'paths': [
          'src',
        ],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
};
