import { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fireApp from "../config/firebase";
import { setUser } from "../redux/actions";
import { connect } from "react-redux";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    Button
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import Profile from "../assets/profile-icon.png";

const auth = getAuth(fireApp)

/* Sample Data */
const DATA = [
    {
        id: nanoid(),
        name: "Jeremy",
        time: "12:30pm",
        message: "This is a sample message...",
    },
    {
        id: nanoid(),
        name: "Catilyn",
        time: "3:30pm",
        message: "This is a sample message...",
    },
    {
        id: nanoid(),
        name: "Sam",
        time: "6:05pm",
        message: "This is a sample message...",
    },
];

function MessageItem({ name, time, message }) {
    const navigation = useNavigation();
    return (
        <TouchableHighlight
            onPress={() => navigation.navigate('Message', {
                recievingUser: name
            })}
        >
            <View style={styles.itemContainer}>
                <Image style={{ height: 60, width: 60 }} source={Profile} />
                <View style={styles.itemSection}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemTime}>{time}</Text>
                    </View>
                    <Text style={styles.itemMessage}>{message}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const renderMessageItem = ({ item }) => (
    <MessageItem name={item.name} time={item.time} message={item.message} />
);

const Home = ({ user, setUser }) => {
    const [text, setText] = useState("");

    const signOut = async () => {
        try {
            await auth.signOut()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Button title="LogOut" onPress={signOut} />

            <TextInput
                style={styles.input}
                placeholder="Search"
                value={text}
                onChangeText={setText}
            />
            <FlatList
                data={DATA}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    input: {
        padding: 15,
        backgroundColor: "#E3E7EE",
        margin: 15,
        borderRadius: 10,
        fontSize: 18,
    },
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
    },
    itemSection: {
        paddingTop: 5,
        flex: 1,
        marginLeft: 5,
    },
    itemHeader: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemName: {
        fontSize: 19,
        fontWeight: "700",
    },
    itemMessage: {
        fontSize: 16,
        color: "#999999",
    },
    itemTime: {
        fontSize: 16,
        color: "#A5ADF9",
        fontWeight: "600",
    },
});

const mapDispatch = { setUser };
const mapState = (store) => ({
    user: store.dataReducer.user,
});

export default connect(mapState, mapDispatch)(Home);