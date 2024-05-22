import React, { forwardRef } from 'react';
import { useFonts } from "expo-font";
import { fonts } from "./src/global/fonts";
import { Provider } from "react-redux";
import store from './src/store';
import Toast from 'react-native-toast-message';
import MainNavigator from './src/Navigation/MainNavigator';
import { init } from './src/db';

init()
  .then(()=> console.log("base de datos iniciada"))
  .catch((err) => {
    console.log("error")
    console.log(err);
  })

const ForwardedToast = forwardRef((props, ref) => {
  return <Toast ref={ref} {...props} />;
});

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }
  return (
      <Provider store={store}>
        <MainNavigator/>
        <ForwardedToast />
      </Provider>
  );
}



 
