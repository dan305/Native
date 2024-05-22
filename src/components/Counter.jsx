import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../features/counter/counterSlice';
import StyledText from '../styledComponents/StyledText';
import StyledView from '../styledComponents/StyledView';

const Counter = ({ stock, onChangeQuantity }) => {
  const count = useSelector((state) => state.counterReducer.value);
  const dispatch = useDispatch();

  const decrementCount = () => {
    if (count > 1) {
      dispatch(decrement());
      onChangeQuantity(count - 1);
    }
  };

  const incrementCount = () => {
    if (count < stock) {
      dispatch(increment());
      onChangeQuantity(count + 1);
    }
  };

  const resetCount = () => {
    dispatch(reset());
    onChangeQuantity(1); 
  };

  return (
    <StyledView row card>
      <Pressable onPress={decrementCount} style={styles.button}>
        <StyledText font text>-</StyledText>
      </Pressable>
      <StyledText font>{count}</StyledText>
      <Pressable onPress={incrementCount} style={styles.button}>
        <StyledText font text>+</StyledText>
      </Pressable>
      <Pressable onPress={resetCount} style={styles.button}>
        <StyledText font text >x</StyledText>
      </Pressable>
    </StyledView>
  );
};

export default Counter;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    alignItems:'center'
  },
});
