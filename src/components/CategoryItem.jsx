import { Pressable, StyleSheet} from "react-native";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/shop/shopSlice";
import StyledText from "../styledComponents/StyledText";
import StyledView from "../styledComponents/StyledView";



const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch()

  return (
    <StyledView card marginVertical>
      <Pressable
      onPress={() => {
        dispatch(setCategorySelected(category))
        navigation.navigate("ItemListCategories", { category });
      }}
    >
        <StyledText textCategori white>{category}</StyledText>
      </Pressable>
    </StyledView>
  );
};

export default CategoryItem;



const styles = StyleSheet.create({
});