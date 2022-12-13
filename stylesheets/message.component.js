import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    mainContainer__dark: {
      flex: 1,
      backgroundColor: "#1A1A1D",
    },
    inner: {
        padding: 5,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    colourButton: {
        borderRadius: 10,
        height: 63,
        width: 60, 
        position: "absolute", 
        right: 10, 
        bottom: 0, 
        borderColor: "black", 
        borderWidth: StyleSheet.hairlineWidth * 10, 
        flex: 1, 
        justifyContent: "center",
    },
    sendButton: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        transform: [{ rotate: "-25deg" }] 
    },
    messageInput: {
        backgroundColor: "white", 
        position: "absolute", 
        paddingHorizontal: 10, 
        fontSize: 18, 
        textAlignVertical: "center", 
        paddingVertical: 30, 
        borderColor: "black", 
        borderWidth: StyleSheet.hairlineWidth * 10, 
        borderRadius: 10, 
        width: "75%", 
        flexGrow: 0, 
        flexShrink: 1, 
        alignSelf: "flex-end", 
        margin: 10, 
        justifyContent: "flex-start", 
        backgroundColor: "#E3E7EE",
        left: 10 
    },
    messageInput__dark: {
        backgroundColor: "white", 
        position: "absolute", 
        paddingHorizontal: 10, 
        fontSize: 18, 
        textAlignVertical: "center", 
        paddingVertical: 30, 
        borderColor: "black", 
        borderWidth: StyleSheet.hairlineWidth * 10, 
        borderRadius: 10, 
        width: "75%", 
        flexGrow: 0, 
        flexShrink: 1, 
        alignSelf: "flex-end", 
        margin: 10, 
        justifyContent: "flex-start", 
        backgroundColor: "#2B2A2E",
        color: "white",
        left: 10 
    },
    inputContainer: { 
        flex: 1, 
        flexDirection: "row", 
        flexGrow: 1, 
        justifyContent: "center", 
        marginBottom: 10, 
        position: "relative" 
    },
    flatListContainer: { 
        flex: 8, 
        marginBottom:17
    },
    messageBubble: {
        borderRadius: StyleSheet.hairlineWidth * 15, 
        padding: 12, 
        backgroundColor: "grey", 
        margin: 10, 
        maxWidth: "80%" 
    },
    messageDate: {
        textAlign:"center",
        margin:10, 
        fontWeight:"bold", 
        color:"black",
    }
})