import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Image} from 'react-native';
import * as Location from 'expo-location';



export default function App() {
    const [localisation, setLocalisation] = useState(null);
    const [ville,setVille]= useState('Chargement...');
    const [temperature,setTemperature]=useState(null);
    const [description,setDescription]=useState(null);
    const [image,setImage]=useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getPrevision = (latitude,longitude)=>{
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=minutely&appid=5a8a2ccba26b0289984fd7432bf9fa97&lang=fr&units=metric')
            .then((response) => response.json())
            .then((json) => {
                //for monJour in json.daily

            })
            .catch((error) => {
                console.error(error);
            });
    }
    const getLocalisation = (latitude,longitude) => {
        return fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&exclude=hourly,daily&units=metric&lang=fr&appid=5a8a2ccba26b0289984fd7432bf9fa97')
            .then((response) => response.json())
            .then((json) => {
                setVille(json.name)
                setTemperature(json.main.temp)
                setDescription(json.weather[0].description)
                setImage('http://openweathermap.org/img/wn/'+json.weather[0].icon+'.png')
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocalisation(location);
            getLocalisation(location.coords.latitude,location.coords.longitude)
        })();

    }, []);

    return (
        <View style={styles.container}>
            <Text>{ville}</Text>
            <Text>{temperature}</Text>
            <Text>{description}</Text>
            <Image
                style={styles.tinyLogo}
                source={{uri:image}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});
