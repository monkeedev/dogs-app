import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import React from 'react';

interface Props {
  value: string;
  onSearch: (s: string) => void;
  onChange: (s: string) => void;
}

const SearchBar = ({value, onChange, onSearch}: Props) => {
  const handleChange = (s: string) => {
    if (onChange) {
      onChange(s);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={"Write dog's breed here"}
        onChangeText={handleChange}
      />
      <Pressable onPress={handleSearch}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    padding: 7,
    marginRight: 14,
  },
});

export default SearchBar;
