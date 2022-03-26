import {View, Text, TextStyle, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  text: string;
  highlight: string;
  style?: TextStyle | null;
  highlightStyle?: TextStyle | null;
}

const HighlightedWord = ({
  text,
  highlight,
  style = null,
  highlightStyle = null,
}: Props) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <View>
      <Text style={style}>
        {parts.map((i, k) =>
          i.toLowerCase() === highlight.toLowerCase() ? (
            <Text
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

export default HighlightedWord;
