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
import styles from '../stylesheets/home.component';
import store from '../redux/store/index'

const auth = getAuth(fireApp)
const db = getFirestore(fireApp)

function MessageItem({ fName, lName, time, message, otherUser }) {
    const state = store.getState();
    const systemTheme = state.dataReducer.systemTheme
    const accentColour = state.dataReducer.accentColour
    const user = state.dataReducer.user
    let [m, setM] = useState({sent_at: "", text: ""})
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
            if (allMessages.length !== 0){
                setM({sent_at:new Date(allMessages.at(0).sent_at).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}), text:allMessages.at(0).text})
            }
            
        })}, [])

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
                        <Text style={systemTheme == 'light' ? styles.itemName : styles.itemName__dark}>{fName} {lName}</Text>
                        <Text style={[styles.itemTime, { color: accentColour }]}>{m.sent_at}</Text>
                    </View>
                    <Text style={styles.itemMessage}>{m.text}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const renderMessageItem = ({ item }) => (
    <MessageItem fName={item.fName} lName={item.lName} time="3:28pm" message="Random Message" otherUser={item} systemTheme />
);


const Home = ({ user, setUser, setAccentColour,setTheme, setSystemFont, systemTheme, systemFont, accentColour }) => {
    const navigation = useNavigation();
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
                                <Text style={[styles.itemName, { fontFamily: systemFont }]}>{fName} {lName}</Text>
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


const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(Home);