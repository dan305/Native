import React from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import StyledView from "../styledComponents/StyledView";

const MyProfileTabIcon = ({ focused }) => {
  const { user, profileImage } = useSelector((state) => state.authReducer.value);

  return (
    <StyledView>
      {profileImage ? (
        <Image 
          source={{ uri: profileImage }} 
          style={styles.profileImage}
        />
      ) : (
        <EvilIcons 
          name="user"
          size={30}
          color={focused ? "black" : "white"}
        />
      )}
    </StyledView>
  );
};

export default MyProfileTabIcon;

const styles = {
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
};
