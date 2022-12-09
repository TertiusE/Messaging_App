import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    justifyContent: "stretch",
    alignItems: "stretch",
    width: "80%",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  subheader: {
    fontWeight: "500",
    fontSize: 20,
    color: "#9F9F9F",
    marginTop: 10,
    marginBottom: 15,
  },
  inputText: {
    backgroundColor: "#E3E7EE",
    padding: 20,
    borderRadius: 15,
    marginTop: 4,
    marginBottom: 18,
    fontSize: 16,
  },
  inputLabel: {
    justifyContent: "stretch",
    alignSelf: "stretch",
    color: "#A0A0A0",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#5C4DF8",
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 30,
    shadowColor: "#9F9F9F",
    shadowOffset: {
        width: 2,
        height: 3
      },
      shadowOpacity:1
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    shadowColor:'grey'
  },
});

