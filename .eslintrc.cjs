module.exports = {
   env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended'
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: [
      'react',
      'react-refresh',
      'jest'
   ],
   rules: {
      indent: [
         'error',
         3
      ],
      'linebreak-style': [
         'error',
         'windows'
      ],
      quotes: [
         'error',
         'single'
      ],
      semi: [
         'error',
         'always'
      ],
      'react-refresh/only-export-components': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
   }
};