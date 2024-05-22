import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Orders from "../screens/Orders"
import OrdersDetail from "../screens/OrdersDetail";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const OrdersStack = () => {
    return (<Stack.Navigator initialRouteName="Orders" screenOptions={
        {
            header: () => <Header title="ORDENES" />
        }
    }>
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="OrdersDetail" component={OrdersDetail} options={{ title: 'Detalle de la Orden' }} />
    </Stack.Navigator>
    );
};



export default OrdersStack;