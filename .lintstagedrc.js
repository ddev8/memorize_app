module.exports = {
  'src/**/*.ts': (files) => `ng lint ${files.map((file) => `--lint-file-patterns ${file}`).join(' ')}`
  // 'src/**/*.spec.ts': (files) =>
  //   `ng test --watch false --browsers ChromeHeadless ${files.map((file) => `--include ${file}`).join(' ')}`
};
