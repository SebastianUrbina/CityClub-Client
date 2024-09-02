import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  //Global State
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  //Local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  //handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "/auth/update-user",
        {
          name,
          password,
          email,
        });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFYgpCPMtvHYo7rQ8fFSEgLa1BO78b_9hHA&usqp=CAU",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warningText}>Update Name or Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.InputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.InputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.InputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Please Wait" : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#240747",
  },
  warningText: {
    color: "#f70776",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  InputText: {
    fontWeight: "bold",
    width: 70,
    color: "#0092ca",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "#0092ca",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
