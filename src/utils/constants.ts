import React from 'react';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

export const colors = {
  white: '#fffafb',
  lightGray: '#E3F1EA',
  turquoise: '#2BD9A5',
  darkTurquoise: '#2E8A6E',
  darkGray: '#2b2c28',
  black: '#131515',
};

export const text = {
  xs: 7,
  s: 14,
  m: 21,
  l: 28,
  xl: 35,
  xxl: 42,
};

export const animationConfig = {
  duration: 200,
};

export const turquoiseGradientArray = [colors.turquoise, '#2bd9a5aa'];

export const shareBottomSheetRef = React.createRef<any>();

export const springConfig = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
