import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import ProductItem from "../components/ProductItem";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shopService";

function ItemListCategories({ navigation }) {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  const category = useSelector((state) => state.shopReducer.value.categorySelected);
  const { data: productsFilteredByCategory, isLoading: dataIsLoading, error } = useGetProductsByCategoryQuery(category);

  useEffect(() => {
    if (productsFilteredByCategory) {
      const productsRaw = Object.values(productsFilteredByCategory)
      const productsFiltered = productsRaw.filter((product) =>
        product.title.includes(keyword)
      );
      setProducts(productsFiltered);
    }
  }, [productsFilteredByCategory, keyword]);

  useEffect(() => {
    setIsLoading(dataIsLoading);
  }, [dataIsLoading]);

  return (
    <View style={styles.container}>
      <Search onSearch={setKeyword} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem product={item} navigation={navigation}/>}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
});
