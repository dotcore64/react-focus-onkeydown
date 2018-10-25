module.exports = api => ({
  presets: [['@babel/env', { useBuiltIns: 'usage' }], '@babel/react'],
  plugins: [
    '@babel/proposal-class-properties',
    api.env() === 'test' && ['istanbul', { exclude: ['test/*.jsx'] }],
  ].filter(Boolean),
});
