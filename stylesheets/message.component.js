import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#F5F5F5",
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
        borderRadius: 30,
        height: 60,
        width: 60, 
        position: "absolute", 
        right: 10, 
        bottom: 0, 
        flex: 1, 
        justifyContent: "center",
    },
    sendButton: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        transform: [{ rotate: "-50deg" }, 
                    { translateY: 1 },
                    { translateX: 2 }
                ], 
    },
    messageInput: {
        backgroundColor: "white", 
        position: "absolute", 
        paddingHorizontal: 10, 
        paddingLeft:10,
        fontSize: 18, 
        textAlignVertical: "center", 
        paddingVertical: 30, 
        borderColor: "#A09F9F", 
        borderWidth: StyleSheet.hairlineWidth * 2, 
        borderRadius: 30, 
        width: "75%", 
        flexGrow: 0, 
        flexShrink: 1, 
        alignSelf: "flex-end", 
        margin: 10, 
        justifyContent: "flex-start", 
        backgroundColor: "#F8F8F8",
        left: 10 
    },
    messageInput__dark: {
        position: "absolute", 
        paddingHorizontal: 10, 
        paddingLeft:10,
        fontSize: 18, 
        textAlignVertical: "center", 
        paddingVertical: 30, 
        borderColor: "#3D3D3D", 
        borderWidth: StyleSheet.hairlineWidth * 2, 
        borderRadius: 30, 
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
        marginBottomr: 10, 
        position: "relative",
    },
    flatListContainer: { 
        flex: 8, 
        marginBottom:17
    },
    messageBubble: {
        borderRadius: 17,
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