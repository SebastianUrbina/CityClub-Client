import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { PartyContext } from "../context/partyContext";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";


const Post = () => {
  
  //Global state

  const [parties, setParties] = useContext(PartyContext);
  //Local State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image");
    }
  };

  const uploadParty = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('date', date);

    if (selectedImage) {
      formData.append('file', {
        uri: selectedImage,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await axios.post('party/create-party', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success', response.data);
      navigation.navigate("Home");
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

 

  /*const handleParty = async () => {
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
      setParties([...parties, data?.parties]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };*/

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
          <TextInput
            style={styles.inputBox}
            placeholder="add event address"
            placeholderTextColor={"gray"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="add event date"
            placeholderTextColor={"gray"}
            value={date}
            onChangeText={(text) => setDate(text)}
          />
          {selectedImage && (
            <View style={styles.imageContainer}>
              <TextInput
                type="file"
                onChange={(e) => setSelectedImage(e.result.assets[0].uri)}
              />
              <Image source={{ uri: selectedImage }} style={styles.image} />
            </View>
          )}
          <View>
            <TouchableOpacity style={styles.postBtn} onPress={pickImage}>
              <Text style={styles.postBtnText}>Select Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={uploadParty}>
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
    backgroundColor: "#240747",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0092ca",
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
    backgroundColor: "#0092ca",
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
  imageContainer: {
    flex: 1,
    paddingTop: 30,
  },
  image: {
    width: 320,
    height: 250,
    borderRadius: 20,
  },
});
