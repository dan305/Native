import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'; 
import { removeItem } from '../features/shop/cartSlice'; 
import Toast from 'react-native-toast-message';
import StyledText from '../styledComponents/StyledText';
import StyledView from '../styledComponents/StyledView';

const CartItem = ({ item }) => {
  const dispatch = useDispatch(); 

  const handleRemoveItem = () => { 
    dispatch(removeItem({ productId: item.id }));

    Toast.show({
      type: 'info', 
      text1: '¡Producto eliminado!',
      visibilityTime: 1000,
    });
  };

  return (
    <StyledView itemCart>
      <StyledView>
        <StyledText>Nombre: {item.title}</StyledText>
        <StyledText>Precio: ${item.price}</StyledText>
        <StyledText>Cantidad: {item.quantity}</StyledText>
      </StyledView>
      <Pressable onPress={() => {
        handleRemoveItem();
      }}>
        <Ionicons name="trash-bin-outline" size={24} color="black" />
      </Pressable>
    </StyledView>
  );
};

export default CartItem;

const styles = StyleSheet.create({
})
