import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import useStable from "react-native-web/dist/modules/useStable";
import React, {useEffect, useState} from "react";
import ScrollViewBase from "react-native-web/dist/exports/ScrollView/ScrollViewBase";

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

  useEffect(() => {

    console.log('listGoals :' , listGoals)
  }, [listGoals])
  function addList(){
    setGoals([...listGoals,{id:listGoals.length+1,name:input}])
    setInput('')
    this.textInput.clear()
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
    <View style={styles.container}>
      <Text><Text style={styles.couleurText}>Bienvenue</Text> à tous ! </Text>
      <View style={styles.textRow}>
        <TextInput style={styles.couleurSaisi} ref={input => { this.textInput = input }} placeholder={"Saisir votre texte  "} editable maxLength={15} onChangeText={item=>setInput(item)} clearButtonMode/>
        <Button
            style={styles.couleurButtonAdd}
            title="Add"
            accessibilityLabel="Learn more about this purple button"
            onPress={addList}
        />
      </View>
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

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:120,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  couleurText: {
    color: 'red',
    fontSize: 20,
  },
  textRow: {
    flexDirection:'row',
  }
  ,
  couleurSaisi: {
    width:300,
    color: 'black',
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
  }
});


