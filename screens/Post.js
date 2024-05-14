import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { PartyContext } from "../context/partyContext";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const Post = ({ navigation }) => {
  //Global state
  const [parties,setParties] = useContext(PartyContext);
  //Local State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleParty = async () => {
    try {
      setLoading(true);
      if (!name) {
        alert("Please add name to your party");
      }
      if (!description) {
        alert("Please add description to your party");
      }
      const { data } = await axios.post("party/create-party", {
        name,
        description,
      });
      setLoading(false);
      setParties([...parties, data?.parties])
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={styles.heading}>Create Party</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="add event name"
            placeholderTextColor={"gray"}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="add event description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handleParty}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" size={18} /> {"  "}
              Create Party
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View>
        <FooterMenu style={styles.ftMenu} />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#430f58",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#59a985",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "#42b883",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
