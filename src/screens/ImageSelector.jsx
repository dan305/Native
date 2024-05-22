import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/auth/authSlice";
import { usePostProfileImageMutation } from "../services/shopService";
import StyledText from "../styledComponents/StyledText";

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const { localId } = useSelector((state) => state.authReducer.value);
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();
  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true; 
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const confirmImage = () => {
    dispatch(setCameraImage(image));
    triggerSaveProfileImage({ localId, image });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Pressable style={styles.button} onPress={pickImage}>
            <StyledText link white font>Tomar otra foto</StyledText>
          </Pressable>
          <Pressable style={[styles.button, styles.confirmButton]} onPress={confirmImage}>
            <Text style={styles.buttonText}>Confirmar foto</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.noPhotoContainer}>
          <Text style={styles.noPhotoText}>No hay foto para mostrar </Text>
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Tomar foto</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  noPhotoContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderRadius: 10,
  },
  noPhotoText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
  },
  confirmButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
