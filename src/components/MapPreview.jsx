import { Image, StyleSheet} from "react-native";
import { googleAPI } from "../firebase/googleAPI";
import StyledView from "../styledComponents/StyledView";

const MapPreview = ({ location}) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:blue%7Clabel:S%7C${location.latitude},${location.longitude}
    &key=${googleAPI.mapStatic}`;

  return (
    <StyledView card>
      <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
    </StyledView>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapImage: {
    width: 300,
    height: 300,
  },
});
