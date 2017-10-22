const env = process.env.NODE_ENV;

module.exports = {
  presets: [
    (env === 'test') ? ['env', { modules: false }] : 'env',
    'react',
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-class-properties',
  ].concat(env === 'test' ? [
    ['istanbul', { exclude: ['test/*.jsx'] }],
  ] : []),
};
