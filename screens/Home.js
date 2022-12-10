import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import fireApp from "../config/firebase";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity, Button, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { onSnapshot, collection, query, where, doc, orderBy, limit, getFirestore, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import Profile from "../assets/profile-icon.png";
import { Ionicons } from '@expo/vector-icons';

const auth = getAuth(fireApp)
const db = getFirestore(fireApp)

function MessageItem({ fName, lName, time, message, otherUser }) {
    const navigation = useNavigation();
    return (
        <TouchableHighlight onPress={() => navigation.navigate('Message', {
            recievingUser: `${fName} ${lName}`,
            otherUser: otherUser
        })}>
            <View style={styles.itemContainer}>
                <Image style={{ height: 60, width: 60 }} source={Profile} />
                <View style={styles.itemSection}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{fName} {lName}</Text>
                        <Text style={styles.itemTime}>{time}</Text>
                    </View>
                    <Text style={styles.itemMessage}>{message}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const renderMessageItem = ({ item }) => (
    <MessageItem fName={item.fName} lName={item.lName} time="3:28pm" message="Random Message" otherUser={item} />
);


const Home = ({ user, setUser, setAccentColour, setSystemFont, systemTheme }) => {
    const navigation = useNavigation();
    const [text, setText] = useState("");
    const [showModal, setModal] = useState(false)
    let [currentUser, setCurrent] = useState({})

    navigation.setOptions({
        headerRight: () => <TouchableOpacity onPress={signOut}><Ionicons style={{ marginRight: 10, color: "#5C4DF8" }} name="log-out-outline" size="34" /></TouchableOpacity>
    })

    useEffect(() => {
        const fetchData = async () => {
            const userRef = onSnapshot(doc(db, "users", user.uid), (doc) => {
                setCurrent(doc.data())
                setUser(doc.data())
                setAccentColour(doc.data().accentColour)
                setSystemFont(doc.data().systemFont)
            });
        }
        fetchData()
            .catch(console.error);
    }, [])

    const FullView = () => {
        const [modalText, setModalText] = useState("")
        const [modalData, setModalData] = useState([])

        useEffect(() => {
            const fetchData = async () => {
                if (modalText.length <= 1) {
                    let newData = []
                    let usersRef = collection(db, "users")
                    const q = query(usersRef, orderBy("lName"), limit(5))
                    const allUsers = await getDocs(q);
                    allUsers.forEach((doc) => {
                        newData.push(doc.data())
                    })
                    setModalData(newData)
                }
            }

            fetchData().catch((err) => console.log(err));
        }, [modalText])

        let searchUsers = async () => {
            let newData = []
            let usersRef = collection(db, "users")
            const first = query(usersRef, where("fName", ">=", modalText), where("fName", "<=", modalText))
            const last = query(usersRef, where("lName", ">=", modalText), where("lName", "<=", modalText))
            const email = query(usersRef, where("email", ">=", modalText), where("email", "<=", modalText))
            const allFirst = await getDocs(first)
            const allLast = await getDocs(last)
            const allEmails = await getDocs(email)

            allFirst.forEach((doc) => {
                if (!newData.includes(doc.data())) {
                    newData.push(doc.data())
                }
            })
            allLast.forEach((doc) => {
                if (!newData.includes(doc.data())) {
                    newData.push(doc.data())
                }
            })
            allEmails.forEach((doc) => {
                if (!newData.includes(doc.data())) {
                    newData.push(doc.data())
                }
            })
            setModalData(newData)
        }

        const addToHome = async (otherUser) => {
            const contains = (converations, userO) => {
                let output = false
                converations.forEach(element => {
                    if (element.uid === userO.uid) {
                        output = true
                    }
                })
                return output
            }

            if (!contains(currentUser.conversations, otherUser)) {
                const userRef = doc(db, "users", currentUser.uid)
                const userUnion = await updateDoc(userRef, {
                    conversations: arrayUnion(otherUser)
                })
            }

            if (!contains(otherUser.conversations, currentUser)) {
                const otherRef = doc(db, "users", otherUser.uid)
                const otherUnion = await updateDoc(otherRef, {
                    conversations: arrayUnion(currentUser)
                })
            }


        }

        function ModalItem({ fName, lName, otherUser }) {
            const navigation = useNavigation();
            return (
                <TouchableHighlight
                    onPress={() => {
                        addToHome(otherUser).catch(err => console.log(err))
                        navigation.navigate('Message', { recievingUser: `${fName} ${lName}`, otherUser: otherUser })
                        setModal(!showModal)
                    }}
                >
                    <View style={styles.itemContainer}>
                        <Image style={{ height: 60, width: 60 }} source={Profile} />
                        <View style={styles.itemSection}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>{fName} {lName}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        }

        const renderModalItem = ({ item }) => (
            <ModalItem fName={item.fName} lName={item.lName} otherUser={item} />
        );

        return (
            <Modal animationType='slide' transparent={false} visible={showModal} >
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        value={modalText}
                        onChangeText={setModalText}
                        keyboardAppearance={systemTheme}
                    />
                    <Button title="Search" onPress={() => { searchUsers() }} />
                    <FlatList
                        data={modalData}
                        renderItem={renderModalItem}
                        keyExtractor={(item) => item.uid}
                    />
                    <Button title="Close" onPress={() => { setModal(!showModal) }} />

                </SafeAreaView>
            </Modal>
        )
    }

    const signOut = async () => {
        try {
            await auth.signOut()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                value={text}
                onChangeText={setText}
            />
            <FlatList
                data={currentUser.conversations}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.uid}
            />
            <FullView />
            <Button title="Add" onPress={() => { setModal(!showModal) }} />
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

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(Home);