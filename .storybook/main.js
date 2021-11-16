module.exports = {
  stories: ['../source/components/**/*.stories.js'],
  addons: ['@storybook/addon-actions/register','@storybook/addon-essentials'],
  core: {
  	builder: 'webpack5',
  },
};