import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PartyCard = ({ parties, myPartyScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [party, setParty] = useState({});
  const navigation = useNavigation();
  //Handle Delete Prompt
  const HandleDeletePrompt = (id) => {
    Alert.alert(
      "Attention!",
      "Are you sure that you want to delete this Party?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Press!");
          },
        },
        {
          text: "Delete",
          onPress: () => handleDeleteParty(id),
        },
      ]
    );
  };

  //Delete Party Data
  const handleDeleteParty = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/party/delete-party/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.navigate("Myparties");
    } catch (error) {
      setLoading(true);
      console.log(error);
      alert(error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}> Parties {parties?.length}</Text>
      {myPartyScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          party={party}
        />
      )}
      {parties?.map((party, i) => (
        <View key={i} style={styles.card}>
          {myPartyScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {
                    setParty(party), setModalVisible(true);
                  }}
                />
              </Text>
              <Text>
                <FontAwesome5
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => HandleDeletePrompt(party?._id)}
                />
              </Text>
            </View>
          )}

          <Text style={styles.title}>{party?.name}</Text>
          <Text style={styles.desc}>{party?.description}</Text>
          {party?.image && (
            <Image
              source={{
                uri: `http://192.168.100.57:8080/${party.image}`
              }}
              style={styles.imagePlace}
            />
          )}

          <View style={styles.footer}>
            
              <Text>
                {" "}
                <FontAwesome5 name="location-arrow" color={"red"} />{" "}
                {party?.address}
              </Text>
            
            <Text>
              {" "}
              <FontAwesome5 name="calendar" color={"black"} />{" "}
              {party?.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PartyCard;

const styles = StyleSheet.create({
  heading: {
    color: "#0092ca",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "white",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
  imagePlace: {
    width: 330,
    height: 300,
    borderRadius: 19,
    marginTop: 10,
    marginLeft: 20,
  },
});
