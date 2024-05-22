import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native';
import allProducts from '../data/products.json';
import Counter from '../components/Counter';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/shop/cartSlice';
import Toast from 'react-native-toast-message';

const ItemDetail = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { id } = route.params;
  const dispatch = useDispatch();

  const onAddCart = () => {
    dispatch(addItem({ ...product, quantity: selectedQuantity }));

    Toast.show({
      type: 'success',
      text1: '¡Agregado al carrito!',
      visibilityTime: 1000,
    });
  };

  const renderImages = () => {
    if (product && product.images && product.images.length > 0) {
      return product.images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.image} />
      ));
    }
    return null;
  };

  useEffect(() => {
    const productFound = allProducts.find((product) => product.id === id);
    setProduct(productFound);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Cantidad: {product.stock}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <View style={styles.imageContainer}>
            {renderImages()}
          </View>
          <Counter stock={product.stock} onChangeQuantity={setSelectedQuantity} />
          <Pressable style={styles.buyButton} onPress={onAddCart}>
            <Text style={styles.buyButtonText}>Agregar al carrito</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#93a7de",
    borderRadius: 10,
    margin: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
