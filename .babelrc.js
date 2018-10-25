module.exports = api => ({
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/proposal-class-properties',
    api.env() === 'test' && ['istanbul', { exclude: ['test/*.jsx'] }],
  ].filter(Boolean),
});
