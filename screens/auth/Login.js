import { StyleSheet, Text, Alert, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);

  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //Submit Function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        return Alert.alert("Please Fill All The Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("Login Data ==> ", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
      error;
    }
  };
  //temp function to check local storage data

  useEffect(() => {
    const getLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("Local Storage ==> ", data);
    };

    getLocalStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/*<Text>{JSON.stringify({name, email, password}, null, 4)}</Text>*/}
      <SubmitButton
        btnTitle={"Sign In"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Don't have account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Register
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#102c54",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e3e3e3",
    marginBottom: 20,
  },
  linkText: {
    textAlign: "center",
    color: "white",
  },
  link: {
    color: "#59a985",
  },
});
