import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapPreview from "../components/MapPreview";
import { googleAPI } from "../firebase/googleAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../features/auth/authSlice";
import { usePostUserLocationMutation } from "../services/shopService";
import StyledText from "../styledComponents/StyledText";

const LocationSelector = () => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const { localId } = useSelector((state) => state.authReducer.value);
  const [triggerPostAddress, result] = usePostUserLocationMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleAPI.mapStatic}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          setAddress(data.results[0].formatted_address);
        }
      } catch (err) {}
    })();
  }, [location]);

  const onConfirmAddress = () => {
    const locationFormatted = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: address,
    };
    dispatch(setUserLocation(locationFormatted));

    triggerPostAddress({localId, location: locationFormatted});
  };

  return (
    <View style={styles.container}>
      <StyledText title label>Mi Dirección</StyledText>
      {location.latitude ? (
        <View style={styles.noLocationContainer}>
          <StyledText font label>
            Lat: {location.latitude}, long: {location.longitude}
          </StyledText>
          <MapPreview location={location} />
          <StyledText font label>{address}</StyledText>
          <Pressable style={styles.button} onPress={onConfirmAddress}>
            <StyledText text white>Confirmar Dirección</StyledText>
          </Pressable>
        </View>
      ) : (
        <StyledText errorColor>{error}</StyledText>
      )}
    </View>
  );
};

export default LocationSelector;


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 130,
    paddingTop: 40,
  },
  noLocationContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "80%",
    elevation: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 14,
    marginTop: 20,
  },

});
