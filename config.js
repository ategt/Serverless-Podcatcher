module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))', "/node_modules/(?!test-component).+\\.js$"],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'node'],
  testEnvironment: "jsdom",
  verbose: true,
};