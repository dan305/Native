import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import { colors } from "../global/Colors";
import { StyleSheet, Text, View } from "react-native";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import OrdersStack from "./OrdersStack";
import MyProfileStack from "./MyProfileStack";
import MyProfileTabIcon from "../components/MyProfileTab";
import StyledView from "../styledComponents/StyledView";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar, 
      }}
    >
      <Tab.Screen
        name="ShopTab"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <Entypo name="shop" size={30} color={focused ? "black" : "white"} />
                <Text style={{ color: focused ? "black" : "white" }}>Tienda</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <AntDesign
                  name="shoppingcart"
                  size={30}
                  color={focused ? "black" : "white"}
                />
                <Text style={{ color: focused ? "black" : "white" }}>Carrito</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabContainer}>
                <FontAwesome
                  name="list-ul"
                  size={30}
                  color={focused ? "black" : "white"}
                />
                <Text style={{ color: focused ? "black" : "white" }}>Ordenes</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="MyProfileStack"
        component={MyProfileStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <StyledView card>
                <MyProfileTabIcon/>
                <Text style={{ color: focused ? "black" : "white" }}>Mi Perfil</Text>
              </StyledView>
            );
          },
        }}
      />
    </Tab.Navigator>
    
  );
};

export default TabNavigator;

const styles = StyleSheet.create ({
  tabBar: {
    backgroundColor : colors.header,
    shadowColor: 'white',
    height:70
},
})