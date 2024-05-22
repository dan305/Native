import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native'; 


const OrdersDetail = ({ route }) => {
    const { orders, selectedOrder } = route.params;

    if (!orders || !selectedOrder) {
        return <Text>No se encontró la orden.</Text>;
    }

    const foundOrder = orders.find(item => item.id === selectedOrder.id);

    if (!foundOrder) {
        return <Text>No se encontró la orden.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de la Orden</Text>
            <View style={styles.orderInfo}>
                <Text style={styles.infoItem}>Fecha de creación: {foundOrder.formattedDate}</Text>
                <Text style={styles.infoItem}>Total: ${foundOrder.total}</Text>
                <Text style={styles.infoItem}>Usuario: {foundOrder.user}</Text>
            </View>
            <Text style={styles.subtitle}>Productos:</Text>
            <FlatList
                data={foundOrder.cartItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text style={styles.productText}>Producto: {item.title}</Text>
                        <Text style={styles.productText}>Cantidad: {item.quantity}</Text>
                        <Text style={styles.productText}>Precio unitario: ${item.price}</Text>
                        <Text style={styles.productText}>Descripción: {item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderInfo: {
        marginBottom: 20,
    },
    infoItem: {
        fontSize: 18,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItem: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    productText: {
        fontSize: 16,
    },
});

export default OrdersDetail;
