import { Feather } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import colors from '../constants/colors';

const Search = (props) => {
  const [text, setText] = useState('');
  const { value, onChangeText } = props;
  const inputRef = useRef(null);
  useDebounce(() => onChangeText(text), [text], 800);
  useEffect(() => requestFocus(), []);

  const requestFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Pressable onPress={requestFocus}>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          value={value}
          style={styles.input}
          placeholder='Search'
          placeholderTextColor={colors.gray}
          onChangeText={setText}
        />
        <Feather name='search' size={24} color={colors.gray} />
      </View>
    </Pressable>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
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
