import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  mainContainer__dark: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1D"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  header__dark: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    color:'white'
  },
  inputContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "80%",
    flex: 0.8,
  },
  inputLabel: {
    color: "#999999",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 25,
  },
  inputLabel_dark: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 25,
    
  },
  inputText: {
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    color: "black",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  inputText__dark: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: "white",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#5C4DF8",
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 20,
    shadowColor: "#9F9F9F",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
  },
  saveButton__dark: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#5C4DF8",
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 20,  
    shadowOpacity: 1,
  },
  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    shadowColor: "grey",
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 30,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    elevation: 2,
    color: 'white',
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: "#A5ADF9",
    color: 'white',
    fontSize: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: '700'
  },
});