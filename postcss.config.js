module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    // 'postcss-pxtorem': {
    //   propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    //   mediaQuery: true,
    // },
    'postcss-pxtorem': {
      propList: ['*'],
      mediaQuery: true,
    },
  },
};
