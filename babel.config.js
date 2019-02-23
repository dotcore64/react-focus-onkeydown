module.exports = api => ({
  presets: [
    ['@babel/env', { useBuiltIns: 'usage' }],
    api.env() === 'test' && '@babel/react', // jsx is only used in tests
  ].filter(Boolean),
  plugins: [
    api.env() === 'test' && ['istanbul', { exclude: ['test/**'] }],
  ].filter(Boolean),
});
