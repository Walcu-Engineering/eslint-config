import js             from'@eslint/js';
import globals        from'globals';
import stylistic      from'@stylistic/eslint-plugin';
import mochaPlugin    from'eslint-plugin-mocha';
import jestPlugin     from'eslint-plugin-jest';
import reactHooks     from'eslint-plugin-react-hooks';
import formatjsPlugin from'eslint-plugin-formatjs';

const base = [
  js.configs.recommended,
  {
    name: 'walcu/base',
    plugins: { '@stylistic': stylistic },
    languageOptions: { ecmaVersion: 'latest' },
    rules: {
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      }],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-use-before-define': ['error', 'nofunc'],
      'no-unused-vars': 'warn',
      'consistent-return': 'off',
      'no-debugger': 'off',
      'no-console': 'off',
      'quotes': 'off',
      'new-cap': 'off',
      'no-shadow': 'off',
      'preserve-caught-error': 'off',
      '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: true }],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/no-multi-spaces': ['error', { exceptions: { VariableDeclarator: true, ImportDeclaration: true } }],
      '@stylistic/key-spacing': ['warn', { beforeColon: false, afterColon: true, mode: 'strict' }],
      '@stylistic/keyword-spacing': ['warn', { before: true, after: true }],
      '@stylistic/no-trailing-spaces': 'warn',
      '@stylistic/space-infix-ops': 'warn',
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/space-before-blocks': ['warn', 'always'],
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/linebreak-style': ['error', 'unix'],
    },
  },
];

const file_types = [
  { name: 'walcu/mjs', files: ['**/*.mjs'], languageOptions: { sourceType: 'module' } },
  { name: 'walcu/cjs', files: ['**/*.cjs'], languageOptions: { sourceType: 'commonjs' } },
];

const node = [
  ...base,
  {
    name: 'walcu/node',
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  ...file_types,
];

const browser = [
  ...base,
  {
    name: 'walcu/browser',
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  ...file_types,
];

const mocha = [
  mochaPlugin.configs.recommended,
  {
    name: 'walcu/mocha',
    rules: {
      'mocha/no-setup-in-suite': 'off',
      'mocha/no-exports': 'off',
      'mocha/no-conditional-tests': 'off',
      'mocha/max-top-level-suites': ['error', { limit: 1 }],
      'mocha/no-root-hooks': 'warn',
    },
  },
];

const jest = [{
  name: 'walcu/jest',
  plugins: { jest: jestPlugin },
  languageOptions: { globals: globals.jest },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
}];

const react = [{
  name: 'walcu/react',
  plugins: { 'react-hooks': reactHooks },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    '@stylistic/jsx-curly-spacing': ['error', { when: 'never' }],
  },
}];

const formatjs = [{
  name: 'walcu/formatjs',
  plugins: { formatjs: formatjsPlugin },
  rules: {
    'formatjs/enforce-default-message': 'error',
    'formatjs/enforce-placeholders': ['error', { ignoreList: ['b', 'i', 'li', 'ul', 'span', 'br', 'u'] }],
    'formatjs/enforce-plural-rules': 'error',
  },
}];

export default { node, browser, mocha, jest, react, formatjs };
