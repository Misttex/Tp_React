import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
  Modal,
  Alert, Pressable, TouchableOpacityComponent
} from 'react-native';
import useStable from "react-native-web/dist/modules/useStable";
import React, {useEffect, useState} from "react";
import ScrollViewBase from "react-native-web/dist/exports/ScrollView/ScrollViewBase";
import {Touchable} from "react-native-web";

export default function App() {

  const sampleGoals = [
    {
      id: 1,
      name: "Molecule Man",
    },
    {
      id : 2,
      name: "Madame Uppercut"
    },
    {
      id: 3,
      name: "Eternal Flame"
    }
  ];

  const [input,setInput] = useState("")
  const [listGoals,setGoals] = useState(sampleGoals)
  const [modalVisible, setModalVisible] = useState(false);
  const image = { uri: "https://i.pinimg.com/564x/04/43/8c/04438c0b477cf2acded75e0e64c963db.jpg" }
  function addList(){
    setGoals([...listGoals,{id:listGoals.length+1,name:input}])
    setInput('')
    console.log("ici")
    this.textInput.clear()
    setModalVisible(false)
  }
  const deleteList = (id) => {
    const Goals = listGoals.filter((item) => item.id !== id);
    setGoals(Goals);
  };
  const buttonSupp = (id) => {
    return <TouchableOpacity
        onPress={() => deleteList(id)}>
      <Text style={styles.couleurButtonDelete}>Supprimer</Text>
    </TouchableOpacity>
  };
  return (
      <View style={styles.container1}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Ajouter un élément</Text>
                <TextInput style={styles.couleurSaisi} ref={input => { this.textInput = input }} placeholder={"Saisir votre texte  "} editable maxLength={15} onChangeText={item=>setInput(item)} clearButtonMode/>
                <View style={styles.textRow}>
                  <TouchableOpacity
                      style={[styles.button, styles.buttonClose1]}
                      onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Retour</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={addList}
                    >
                      <Text style={styles.textStyle}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        </Modal>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.container}>
          <Text><Text style={styles.couleurText}>Bienvenue</Text> à tous ! </Text>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Ajouter</Text>
            </Pressable>
          <ScrollView>
            {listGoals.map((goals, index) => (
                <View style={styles.textRow} key={index}>
                  <Text>{'\u2B24'} {goals.name}
                    {buttonSupp(goals.id)}
                  </Text>
                </View>
            ))}
          </ScrollView>
          </View>
        </ImageBackground>
      </View>

  );
}


const styles = StyleSheet.create({
  container: {
    color:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
  },
  couleurText: {
    color: 'white',
    fontSize: 20,
  },
  textRow: {
    flexDirection:'row',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
  ,
  couleurSaisi: {
    width:300,
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
  },
  couleurButtonAdd: {
    borderWidth:2,
    borderColor:'green',
    color: 'green',
    fontSize: 20
  },
  couleurButtonDelete: {
    borderWidth:2,
    borderColor:'red',
    marginLeft:10,
    color: 'red',
    fontSize: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#999999",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#00FF00",
  },
  buttonClose: {
    backgroundColor: "#00FF00",
  },
  buttonClose1: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


