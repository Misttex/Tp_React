
import React, { useState, useEffect } from 'react';

import { Platform, Image, Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';



export default function App() {

    const [location, setLocation] = useState(null);

    const [errorMsg, setErrorMsg] = useState(null);

    const [city, setCity] = useState(null);

    const [temp, setTemp] = useState(null);

    const [desc, setDesc] = useState(null);

    const [icon, setIcon] = useState(null);

    const [forecast, setForecast] = useState(null);

    const getWeather = (lat, long) => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=db0aa59a06b91c3d0b88cc186720d92c&units=metric&lang=fr')
            .then(response => response.json())
            .then(data => {
                setTemp(data.main.temp);
                setCity(data.name);
                setDesc(data.weather[0].description);
                setIcon('http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
            })
    }

    const getForecast = (lat, long) => {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=db0aa59a06b91c3d0b88cc186720d92c&units=metric&lang=FR&exclude=hourly,alert,minutely')
            .then(response => response.json())
            .then(data => {
                    setForecast(data.daily);
                }
            )
    }

    const update = () => {
        getWeather(location.coords.latitude,location.coords.longitude)
        getForecast(location.coords.latitude,location.coords.longitude)
    }

    useEffect(() => {

        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {

                setErrorMsg('Permission to access location was denied');

                return;

            }

            let location = await Location.getCurrentPositionAsync({});

            setLocation(location);
            getWeather(location.coords.latitude,location.coords.longitude)
            getForecast(location.coords.latitude,location.coords.longitude)
        })();

    }, []);

    const timeConverter = (dt) =>{
        var a = new Date(dt * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }
    console.log(timeConverter(0));

    let text = <ActivityIndicator />;

    if (errorMsg) {

        text = errorMsg;

    } else if (location) {

        text = null;

    }

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{timeConverter(title.dt)}</Text>
            <Text style={styles.title}>temperature: {title.temp.day}°C</Text>
            <Text style={styles.title}>Description: {title.weather[0].description}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    return (

        <View style={styles.container}>

            <View style={styles.day}>
                <Text style={styles.paragraph}>{text}</Text>
                <Text style={styles.titre}>Météo Actuelle</Text>
                <Image style={styles.tinyLogo} source={{uri: icon}}/>
                <Text style={styles.paragraph}>Ville: {city}</Text>
                <Text style={styles.paragraph}>Température: {temp}°C</Text>
                <Text style={styles.paragraph}>Description: {desc}</Text>
            </View>
            <TouchableOpacity style={styles.update} onPress={() => update()}>
                <Text style={styles.btnText}>Actualiser</Text>
            </TouchableOpacity>
            <FlatList data={forecast} renderItem={renderItem}/>
        </View>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: '#D0CAB5'
    },
    update:{
        padding: 10,
        backgroundColor: 'orange',
        marginVertical:10,
        borderRadius: 10
    },
    btnText:{
        fontSize:18
    },
    titre:{
        fontSize:26,
        fontWeight:"bold",
        marginBottom:10
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    item: {
        backgroundColor: 'green',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
    },
    day: {
        backgroundColor: "skyblue",
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
});