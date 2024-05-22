import { useState } from "react";
import { Pressable, TextInput,StyleSheet  } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import StyledView from "../styledComponents/StyledView";

const Search = ({ onSearch, setCategorySelected }) => {
    const [input, setInput] = useState("");

    const formatInput = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const search = () => {
        if (input.trim()) {
            onSearch(formatInput(input));
        }
    };

    const removeInput = () => {
        setInput("");
        onSearch("");
    };

    return (
        <StyledView>
            <StyledView card row>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder="Busca..."
                />
                <Pressable onPress={search}>
                    <Octicons name="search" size={24} color="black" />
                </Pressable>
                <Pressable onPress={removeInput}>
                    <Entypo name="cross" size={25} color="black" />
                </Pressable>
            </StyledView>
        </StyledView>
    );
}


export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    width: "80%",
    margin: 10
  },
});