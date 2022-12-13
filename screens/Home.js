import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import fireApp from "../config/firebase";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme, setDateOfBirth } from "../redux/actions";
import { connect } from "react-redux";
import { Platform, View, Text, SafeAreaView, FlatList, StyleSheet, Image, TextInput, TouchableHighlight, TouchableOpacity, Button, Modal } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { onSnapshot, collection, query, where, doc, orderBy, limit, getFirestore, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import Profile from "../assets/profile-icon.png";
import { Ionicons } from '@expo/vector-icons';
import styles from '../stylesheets/home.component';
import store from '../redux/store/index'


const auth = getAuth(fireApp)
const db = getFirestore(fireApp)

function MessageItem({ fName, lName, time, message, otherUser }) {
    const state = store.getState();
    const systemTheme = state.dataReducer.systemTheme
    const accentColour = state.dataReducer.accentColour
    const user = state.dataReducer.user
    const systemFont = state.dataReducer.systemFont
    let [m, setM] = useState({ sent_at: "", text: "" })
    const isFocused = useIsFocused()

    useEffect(() => {
        let allMessages = [];
        const userRef = onSnapshot(doc(db, "conversations", otherUser.uid), (doc) => {
            doc.data().messages.forEach((element) => {
                if (
                    (element.sent_to === user.uid && element.sent_by === otherUser.uid) ||
                    (element.sent_to === otherUser.uid && element.sent_by === user.uid)
                ) {
                    allMessages.push(element);
                }
            });
            allMessages = allMessages.sort((m1, m2) => (m1.sent_at < m2.sent_at) ? 1 : (m1.sent_at > m2.sent_at) ? -1 : 0)
            setM({ sent_at: "", text: "" })
            if (allMessages.length !== 0) {
                setM({ sent_at: new Date(allMessages[0].sent_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), text: allMessages[0].text })
            }

        })
    }, [isFocused])

    const navigation = useNavigation();
    return (
        <TouchableHighlight onPress={() => navigation.navigate('Message', {
            recievingUser: `${fName} ${lName}`,
            otherUser: otherUser
        })}>
            <View style={systemTheme == 'light' ? styles.itemContainer : styles.itemContainer__dark}>
                <Image style={{ height: 60, width: 60 }} source={Profile} />
                <View style={styles.itemSection}>
                    <View style={styles.itemHeader}>
                        <Text style={[systemTheme == 'light' ? styles.itemName : styles.itemName__dark, { fontFamily: systemFont }]}>{fName} {lName}</Text>
                        <Text style={[styles.itemTime, { color: accentColour, fontFamily: systemFont }]}>{m.sent_at}</Text>
                    </View>
                    <Text style={[styles.itemMessage, { fontFamily: systemFont }]}>{m.text.length > 20 ? m.text.slice(0,23)+"..." : m.text}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const renderMessageItem = ({ item }) => (
    <MessageItem fName={item.fName} lName={item.lName} otherUser={item} systemTheme />
);


const Home = ({ user, setDateOfBirth, setUser, setAccentColour, setTheme, setSystemFont, systemTheme, systemFont, accentColour }) => {
    const [text, setText] = useState("");
    const [showModal, setModal] = useState(false)
    let [currentUser, setCurrent] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const userRef = onSnapshot(doc(db, "users", user.uid), (doc) => {
                setCurrent(doc.data())
                setUser(doc.data())
                setAccentColour(doc.data().accentColour)
                setSystemFont(doc.data().systemFont)
                setTheme(doc.data().systemTheme)
                setDateOfBirth(doc.data().dateOfBirth)
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
                    <View style={systemTheme == 'light' ? styles.itemContainer : styles.itemContainer__dark}>
                        <Image style={{ height: 60, width: 60 }} source={Profile} />
                        <View style={styles.itemSection}>
                            <View style={[styles.itemHeader, { alignItems: "center" }]}>
                                <Text style={[systemTheme == 'light' ? styles.itemName : styles.itemName__dark, { fontFamily: systemFont, fontSize: 25, alignSelf: "center" }]}>{fName} {lName}</Text>
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
                <SafeAreaView style={systemTheme === "light" ? styles.mainContainer : styles.mainContainer__dark}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{flex:1}}>
                            <TextInput
                                style={systemTheme == 'light' ? styles.input : styles.input__dark}
                                placeholderTextColor={systemTheme == 'light' ? 'black' : 'white'}
                                placeholder="Search"
                                value={modalText}
                                onChangeText={setModalText}
                                keyboardAppearance={systemTheme}
                            />
                        </View>
                        <View style={{position:"absolute",right:25,top:24}}>
                            <TouchableOpacity
                                onPress={() => { searchUsers() }}
                            >
                                <Ionicons name="search" size={30} color={accentColour}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={modalData}
                        renderItem={renderModalItem}
                        keyExtractor={(item) => item.uid}
                    />
                    <View style={{ position: "absolute", right: 15, bottom: 70 }}>
                        <TouchableOpacity
                            style={[styles.colourButton, { backgroundColor: accentColour }]}
                            onPress={() => { setModal(!showModal) }}
                        >
                            <Ionicons name="close" size={50} color="white" />
                        </TouchableOpacity>
                    </View>

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
        <View style={systemTheme == 'light' ? styles.mainContainer : styles.mainContainer__dark}>
            <TextInput
                style={systemTheme == 'light' ? styles.input : styles.input__dark}
                placeholder="Search"
                placeholderTextColor={systemTheme == 'light' ? 'black' : 'white'}
                value={text}
                onChangeText={setText}
                keyboardAppearance={systemTheme}
            />
            <FlatList
                data={currentUser.conversations}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.uid}
            />
            <FullView />

            <View style={{ position: "absolute", right: 15, bottom: 15 }}>
                <TouchableOpacity
                    style={[styles.colourButton, { backgroundColor: accentColour }]}
                    onPress={() => { setModal(!showModal) }}
                >
                    <Ionicons name="add" size={50} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme, setDateOfBirth };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading,
    dateOfBirth: store.dataReducer.dateOfBirth
});

export default connect(mapState, mapDispatch)(Home);