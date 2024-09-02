import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ modalVisible, setModalVisible, party }) => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle Update Party
  const updatePartyHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/party/update-party/${id}`, {
        name,
        description,
        address,
        date,
      });
      setLoading(false);
      navigation.navigate("Myparties");
      alert(data?.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //Initial Party Data
  useEffect(() => {
    setName(party?.name);
    setDescription(party?.description);
    setAddress(party?.address);
    setDate(party?.date);
  }, [party]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Edit Parties has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ color: "#59a985" }}></Text>
            <Text style={styles.modalText}>Edit your Parties</Text>
            <Text>Text</Text>
            <TextInput
              style={styles.inputBox}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text>Description</Text>
            <TextInput
              style={styles.inputBox}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              style={styles.inputBox}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <TextInput
              style={styles.inputBox}
              value={date}
              onChangeText={(text) => setDate(text)}
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {updatePartyHandler(party && party._id), setModalVisible(!modalVisible)}}
              >
                <Text style={styles.textStyle}>{loading ? "Please Wait" : "Update"}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
    elevation: 2,
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    //backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputBox: {
    marginBottom: 20,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
});
