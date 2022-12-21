module.exports = {
  extends: ['@hideoo'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['packages/*/tsconfig.json'],
      },
    },
  ],
}
