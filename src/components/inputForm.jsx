import { StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import StyledText from "../styledComponents/StyledText";
import StyledView from "../styledComponents/StyledView";

const InputForm = ({ label, error, onChange, isSecure }) => {
  const [input, setInput] = useState("");

  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };

  return (
    <StyledView marginBottom>
      <StyledText label>{label}</StyledText>
      <TextInput
        style={[styles.input, error && styles.inputError]} 
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <StyledText errorColor >{error}</StyledText> : null} 
    </StyledView>
  );
};

export default InputForm;


const styles = StyleSheet.create({
 
  input: {
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: 'red', 
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
