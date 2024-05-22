import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Card from "./Card";
import StyledText from "../styledComponents/StyledText";
import StyledView from "../styledComponents/StyledView";

const ProductItem = ({ product, navigation }) => {
  const [isPortrait, setIsPortrait] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);

  const { width, height } = useWindowDimensions();


  useEffect(() => {
    if (height > width) {
      setIsPortrait(true);
      setIsLandscape(false);
    } else {
      setIsPortrait(false);
      setIsLandscape(true);
    }
  }, [width, height]);

  return (
    <StyledView card>
      <Pressable onPress={() => navigation.navigate("ItemDetail", {id: product.id})}>
        <Card style={styles.card}>
          <StyledView>
            <StyledText>{product.title}</StyledText>
            <StyledText font text>${product.price}</StyledText>
          </StyledView>
          <Image style={styles.image} source={{ uri: product.images[0] }} />
        </Card>
      </Pressable>
    </StyledView> 
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:'#93a7de',
    width: '90%',
    padding:10,
  },
  image: {
    width: 70,
    height: 70,
  },
}); 