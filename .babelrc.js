module.exports = (api) => ({
  presets: [
    ['@babel/env', {
      ...(api.env('test') ? {
        targets: {
          browsers: ['chrome >= 60', 'firefox >= 56'], // Test in these browsers is enough
        }
      } : {}),
    }],
    api.env('test') && ['@babel/react', { runtime: 'automatic' }], // jsx is only used in tests
  ].filter(Boolean),
  plugins: [
    api.env('test') && ['istanbul', { exclude: ['test/**'] }],
  ].filter(Boolean),
});
