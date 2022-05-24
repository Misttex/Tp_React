import {StatusBar} from 'expo-status-bar';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Alert,
    TextInput,
    TouchableOpacity,
    Modal, Pressable
} from 'react-native';
import {useEffect, useState} from "react";

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

    useEffect(() => {

        (async () => {
            getCoktail()
        })();

    }, []);

    const Item = ({title}) => (
        <View style={styles.item}>
            <Image style={styles.tinyLogo} source={{uri: title.strDrinkThumb}}/>
            <Text style={styles.title}>{title.strDrink}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setModalVisible(true)} ><Item title={item} /></TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
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
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <FlatList  numColumns={2} data={coktail} renderItem={renderItem}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F003E',
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
