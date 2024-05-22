import React, { useState, useEffect } from 'react';
import {StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import getImageSource from './FuenteImage';
import CategoryItem from './CategoryItem';
import { useGetCategoriesQuery } from '../services/shopService';
import StyledText from '../styledComponents/StyledText';
import StyledView from '../styledComponents/StyledView';

function Categories({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { data, error } = useGetCategoriesQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <StyledView loadingContainer>
        <ActivityIndicator size="larges" color="#0000ff"/>
        <StyledText title>Cargandon...</StyledText>
      </StyledView>
    );
  }

  if (error) {
    return (
      <StyledView loadingContainer card>
        <StyledText errorColor>Error: {error.message}</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ImageBackground source={getImageSource(item)} style={styles.textBackground}>
            <CategoryItem navigation={navigation} category={item} />
          </ImageBackground>
        )}
        keyExtractor={(category) => category}
      />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  textBackground: {
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default Categories;
