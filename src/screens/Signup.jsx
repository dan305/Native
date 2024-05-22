import { Pressable, StyleSheet, Text, View,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { signupSchema } from "../validations/signupSchema";

const Signup = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [triggerSignup, result] = useSignUpMutation();

  const dispatch = useDispatch();

 

  const onSubmit = () => {
    console.log("mail", errorMail);
    console.log("password", errorPassword);
    console.log("confirmPassword", errorConfirmPassword);

    try {
      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");

      signupSchema.validateSync({ password, confirmPassword, email });
      triggerSignup({ email, password });
      console.log("Registro exitoso");
    } catch (err) {
      console.log("path", err.path);
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (result.data) {
      dispatch(setUser(result.data));
    }
  }, [result]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <InputForm label={"Email"} error={errorMail} onChange={setEmail} />
      <InputForm
        label={"Contraseña"}
        error={errorPassword}
        onChange={setPassword}
        isSecure={true}
      />
      <InputForm
        label={"Confirmar contraseña"}
        error={errorConfirmPassword}
        onChange={setConfirmPassword}
        isSecure={true}
      />
      <SubmitButton title={"REGISTRARSE"} onPress={onSubmit} />
      <View style={styles.contenedorText}>
        <Text>¿Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>INGRESAR</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
  );
};

export default Signup;


const styles = StyleSheet.create({
      scrollViewContainer: {
      flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    input: {
        width: '70%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10,
        justifyContent:'center',
        textAlign:'center'
    },
    link: {
        color: 'blue',
        fontSize: 16,
        textAlign: 'center',
        marginTop:10,
    },
    contenedorText: {
        margin: 10,
        alignItems:'center',
        margin:20,
    }
});
 