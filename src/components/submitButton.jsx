import { Pressable, StyleSheet} from "react-native";
import React from "react";
import StyledText from "../styledComponents/StyledText";
import StyledView from "../styledComponents/StyledView";

const SubmitButton = ({ onPress, title }) => {
  return (
    <StyledView card>
      <Pressable onPress={onPress} style={styles.button}>
        <StyledText font white>{title}</StyledText>
      </Pressable>
    </StyledView>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "50%",
  },
});
 