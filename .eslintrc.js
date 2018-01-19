// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'global-require': 0,
    "import/no-dynamic-require": 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'brace-style': ['error', 'stroustrup', {
      'allowSingleLine': true
    }],
    'camelcase': 0,
    'no-console': 0,
    'func-names': ["error", "always"],
    'space-before-function-paren': ["error", "never"],
    "no-unused-vars": ["error", { "args": "after-used" }],
    "max-len": ["error", 512],
    "radix":0,
    "no-underscore-dangle":0,
    "no-return-assign":0
  }
}
