import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FooterMenu = () => {
  //Hooks
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          color={route.name === "Home" ? ("#ff347f") : ("#59a985")}
          style={styles.iconStyle}
        />
        <Text style={styles.txtStyle}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="plus-circle"
          style={styles.iconStyle}
          color={route.name === "Post" ? ("#ff347f") : ("#59a985")}
        />
        <Text style={styles.txtStyle}>Party</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Myparties")}>
        <FontAwesome5
          name="list"
          style={styles.iconStyle}
          color={route.name === "About" ? ("#ff347f") : ("#59a985")}
        />
        <Text style={styles.txtStyle}>My Parties</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={styles.iconStyle}
          color={route.name === "Account" ? ("#ff347f") : ("#59a985")}
        />
        <Text style={styles.txtStyle}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: "#430f58",
    height: 65,
  },
  iconStyle: {
    marginTop: 5,
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
  txtStyle: {
    marginTop: 5,
    color: "#59a985",
  },
});
