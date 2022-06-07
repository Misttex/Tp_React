import {StatusBar} from 'expo-status-bar';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    Modal, Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useEffect, useState} from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

export default function App() {

    const [icon, setIcon] = useState(null);

    const [coktail, setCoktail] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const getCoktail = () => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
            .then(response => response.json())
            .then(data => {
                    setCoktail(data.drinks);
                }
            )
    }

    function HomeScreen({navigation}) {
        const Item = ({title}) => (
            <View>
                <Stack.Screen name="Description" component={DescriptionScreen} />
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Description')}>
                    <Image style={styles.tinyLogo} source={{uri: title.strDrinkThumb}}/>
                    <Text style={styles.title}>{title.strDrink}</Text>
                </TouchableOpacity>
            </View>
        );

        const renderItem = ({item}) => (
            <TouchableOpacity><Item title={item} /></TouchableOpacity>
        );

        return (
            <SafeAreaView style={styles.container}>
                <FlatList  numColumns={2} data={coktail} renderItem={renderItem}/>
            </SafeAreaView>
        );
    }

    function DescriptionScreen() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.itemDescription}>

                </View>
            </SafeAreaView>
        );
    }
    const Stack = createNativeStackNavigator();

    useEffect(() => {

        (async () => {
            getCoktail()
        })();

    }, []);



    return (/*
        */
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Description" component={DescriptionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1773F0',
        color:'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 120,
        height: 120,
        borderRadius:4
    },
    title: {
        fontSize: 18,
        marginTop:15,
        textAlign:'center',
    },
    item: {
        backgroundColor: '#D0CAB5',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    itemDescription: {
        backgroundColor: '#D0CAB5',
        padding: 170,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
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
