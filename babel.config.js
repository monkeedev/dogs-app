module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins: ['react-native-reanimated/plugin'],
};
