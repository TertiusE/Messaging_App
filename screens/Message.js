import { React, useState, useEffect, useCallback } from "react";
import {
    onSnapshot,
    doc,
    getFirestore,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import {
    setUser,
    setAccentColour,
    setSystemFont,
    setLoading,
    setTheme,
} from "../redux/actions";
import { connect } from "react-redux";
import uuid from "react-native-uuid";
import fireApp from "../config/firebase";
import { Keyboard, Alert, Platform, KeyboardAvoidingView, View, FlatList, Text, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from '../stylesheets/message.component';

const db = getFirestore(fireApp);

const Message = ({ user, accentColour, systemTheme, systemFont, route }) => {
    const [text, setText] = useState("");
    const { otherUser } = route.params;
    const [messages, setMessages] = useState([]);
    const [messageArray, setMessageArray] = useState([]);
    const [arrayDates, setArray] = useState([])
    const [messageID, setIDArray] = useState([])
    const isAndroid = Platform.OS == "android"

    const formatAndroid = (date) => {
        let date_array = date.split(":").slice(0, 2)
        if (parseInt(date_array[0]) > 12) {
            return `${parseInt(date_array[0]) - 12}:${date_array[1]} PM`
        }
        return `${date_array[0]}:${date_array[1]} AM`
    }

    useEffect(() => {
        const fetchData = async () => {
            const userRef = onSnapshot(doc(db, "conversations", user.uid), (doc) => {
                let allMessages = [];
                let M_ID = []
                let M_DATES = []
                doc.data().messages.forEach((element) => {
                    if (
                        (element.sent_to === user.uid && element.sent_by === otherUser.uid) ||
                        (element.sent_to === otherUser.uid && element.sent_by === user.uid)
                    ) {
                        allMessages.push(element);
                        if (!M_DATES.includes(new Date(element.sent_at).toDateString())) {
                            M_DATES.push(new Date(element.sent_at).toDateString())
                            M_ID.push(element.id)
                        }
                    }
                });
                allMessages = allMessages.sort((m1, m2) => (m1.sent_at > m2.sent_at) ? 1 : (m1.sent_at < m2.sent_at) ? -1 : 0)
                if (allMessages.length > 0) {
                    let date = new Date(allMessages[0].sent_at)
                }
                setMessages(allMessages);
                setIDArray(M_ID)
                setArray(M_DATES)
            });
        };
        fetchData().catch(console.error);
    }, []);


    let sendMessage = async () => {
        const current_time = new Date().getTime();
        let message_id = uuid.v4()

        if (otherUser.uid != user.uid) {
            const userRef = doc(db, "conversations", user.uid);
            const userUnion = await updateDoc(userRef, {
                messages: arrayUnion({
                    id: message_id,
                    sent_by: user.uid,
                    sent_to: otherUser.uid,
                    sent_at: current_time,
                    text: text,
                }),
            });
        }

        const otherRef = doc(db, "conversations", otherUser.uid);
        const unionRes = await updateDoc(otherRef, {
            messages: arrayUnion({
                id: message_id,
                sent_by: user.uid,
                sent_to: otherUser.uid,
                sent_at: current_time,
                text: text,
            }),
        });
        setText("");
    };

    let deleteMessage = async (m) => {
        console.log(m)
        if (m.sent_by == user.uid) {
            const userRef = doc(db, "conversations", user.uid);
            const userUnion = await updateDoc(userRef, {
                messages: arrayRemove(m),
            });

            const otherRef = doc(db, "conversations", otherUser.uid);
            const unionRes = await updateDoc(otherRef, {
                messages: arrayRemove(m),
            });
        }
    };


    const MessageBubble = ({ text, sent_by, time, id, message }) => {
        let local_date = new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "numeric" })
        let alertOptions = [
            { text: "Delete", onPress: () => { deleteMessage(message) } },
            { text: "Cancel", onPress: () => { } }
        ]
        if (messageID.includes(id)) {
            return (
                <View>
                    <Text style={[styles.messageDate, { color: systemTheme == "light" ? "grey" : "white" }]}>{arrayDates[messageID.indexOf(id)]}</Text>
                    <TouchableWithoutFeedback onLongPress={() => {user.uid == sent_by ? Alert.alert("Options", "", alertOptions) : null}}>
                        <View style={[styles.messageBubble, { alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", backgroundColor: user.uid == sent_by ? accentColour : "#9A9A9A" }, { borderBottomLeftRadius: user.uid == sent_by ? 17 : 0 }, { borderBottomRightRadius: user.uid == sent_by ? 0 : 17 }]}>
                            <Text style={{ fontFamily: systemFont, fontSize: 17, color: systemTheme == "light" ? "white" : "white" }}>{text}</Text>
                            <Text style={{ fontSize: 10, alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", paddingTop: 5, color: systemTheme == "light" ? "white" : "white" }}>{isAndroid ? formatAndroid(local_date) : local_date}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return (
                <TouchableWithoutFeedback onLongPress={() => {user.uid == sent_by ? Alert.alert("Options", "", alertOptions) : null}}>
                    <View style={[styles.messageBubble, { alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", backgroundColor: user.uid == sent_by ? accentColour : "#9A9A9A" }, { borderBottomRightRadius: user.uid == sent_by ? 0 : 17 }, { borderBottomLeftRadius: user.uid == sent_by ? 17 : 0 }]}>
                        <Text style={{ fontFamily: systemFont, fontSize: 17, color: systemTheme == "light" ? "white" : "white" }}>{text}</Text>
                        <Text style={{ fontSize: 10, alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", paddingTop: 5, color: systemTheme == "light" ? "white" : "white" }}>{isAndroid ? formatAndroid(local_date) : local_date}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    const renderMessageBubble = ({ item }) => (
        <MessageBubble text={item.text} sent_by={item.sent_by} time={item.sent_at} id={item.id} message={item} />
    );

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={systemTheme == "light" ? styles.mainContainer : styles.mainContainer__dark}
            keyboardVerticalOffset={110}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.flatListContainer}>
                    <FlatList showsVerticalScrollIndicator={false} data={messages} renderItem={renderMessageBubble} inverted contentContainerStyle={{ flexDirection: 'column-reverse' }} />
                </View>
                <SafeAreaView style={styles.inputContainer}>
                    <TextInput multiline value={text} onChangeText={setText} style={[systemTheme === "light" ? styles.messageInput : styles.messageInput__dark, { paddingVertical: isAndroid ? 17 : 30 }]} />
                    <TouchableOpacity
                        style={[styles.colourButton, { backgroundColor: accentColour }]}
                        onPress={() => { sendMessage() }}
                    >
                        <View style={styles.sendButton}>
                            <Ionicons name="send" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};


const mapDispatch = {
    setUser,
    setAccentColour,
    setSystemFont,
    setLoading,
    setTheme,
};
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading,
});

export default connect(mapState, mapDispatch)(Message);