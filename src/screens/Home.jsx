import { View, StyleSheet, StatusBar } from "react-native";
import Categories from "../components/Categories";
import { LinearGradient } from 'expo-linear-gradient';
function Home({ navigation }) {
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={{ flex: 1 }}
    >
      <View style={styles.body}>
        <StatusBar />
        <Categories navigation={navigation} /> 
      </View>
    </LinearGradient>
  );
}

export default Home;

const styles = StyleSheet.create ({
 
 ovalo: {
  width:90,
  height:60
},
contenedorImage: {
  alignItems:'center',
  paddingTop:20
}
}) 