import React from 'react';
import {Text, TextStyle, View} from 'react-native';

interface Props {
  text: string;
  highlight: string;
  style?: TextStyle | null;
  highlightStyle?: TextStyle | null;
}

export const HighlightedWord = ({
  text,
  highlight,
  style = null,
  highlightStyle = null,
}: Props) => {
  const parts = text
    .split(new RegExp(`(${highlight})`, 'gi'))
    .filter(i => i !== '');

  return (
    <View>
      <Text style={style}>
        {parts.map((i, k) =>
          i.toLowerCase() === highlight.toLowerCase() ? (
            <Text
              testID={`Highlighted`}
              key={`${text}-${k}`}
              style={highlightStyle ?? {fontWeight: '800'}}>
              {i}
            </Text>
          ) : (
            i
          ),
        )}
      </Text>
    </View>
  );
};
