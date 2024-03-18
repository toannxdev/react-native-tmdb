import { Feather } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../constants/colors';

const Search = (props) => {
  const [text, setText] = useState('');
  const { value, onChangeText } = props;
  useDebounce(() => onChangeText(text), [text], 800);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.input}
        placeholder='Search'
        placeholderTextColor={colors.gray}
        onChangeText={setText}
      />
      <Feather name='search' size={24} color={colors.gray} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 48,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    color: colors.onBackground,
  },
});

const useDebounce = (effect, dependencies, delay) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
