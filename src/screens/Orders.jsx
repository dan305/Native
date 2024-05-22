import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderItem from '../components/OrderItem';

const Orders = () => {
    return (
        <View style={styles.container}>
                <OrderItem />
        </View>
    );
}

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});

