module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    //prettire
    'prettier/prettier': [
      1,
      {
        trailingComma: 'all',
        arrowParens: 'avoid',
        printWidth: 100,
        useTabs: false,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        proseWrap: 'always',
        endOfLine: 'auto',
        jsxSingleQuote: true,
        quoteProps: 'as-needed',
        tabWidth: 2,
      },
      {
        disableLanguages: ['js', 'ts', 'tsx', 'jsx', 'scss', 'css', 'less', 'json'],
        usePrettierrc: true,
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },
};
