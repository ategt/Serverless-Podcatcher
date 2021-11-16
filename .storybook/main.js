module.exports = {
  stories: ['../source/components/**/*.stories.js'],
  //addons: ['@storybook/addon-actions/register'],
  addons: [],
  core: {
  	builder: 'webpack5',
  },
};