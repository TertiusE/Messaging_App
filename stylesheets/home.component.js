import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
      flex: 1,
      backgroundColor: "white",
  },
  mainContainer__dark: {
    flex: 1,
    backgroundColor: "#1A1A1D",
  },

  input: {
      padding: 15,
      backgroundColor: "#E3E7EE",
      margin: 15,
      borderRadius: 10,
      fontSize: 18,
  },
  input__dark: {
    padding: 15,
    backgroundColor: "#2B2A2E",
    margin: 15,
    borderRadius: 10,
    fontSize: 18,
    color:'white'
  },

  itemContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "white",
      padding: 15,
      borderTopWidth: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: "#D9D9D9",
      borderTopColor: "#D9D9D9",
      
  },

  itemContainer__dark: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1A1A1D",
    padding: 15,
    borderBottomWidth: 1,
    borderTopWidth: 0.5,
    borderTopColor: "#494949",
    borderBottomColor: "#494949",
},
  itemSection: {
      paddingTop: 5,
      flex: 1,
      marginLeft: 5,
  },
  itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
  },
  itemName: {
      fontSize: 19,
      fontWeight: "700",
  },

  itemName__dark: {
    fontSize: 19,
    fontWeight: "700",
    color:'white'
},
  
  itemMessage: {
      fontSize: 16,
      color: "#999999",
  },
  itemMessage__dark: {
    fontSize: 16,
    color: "#999999",
},
  itemTime: {
      fontSize: 16,
      color: "#A5ADF9",
      fontWeight: "600",
  },
  colourButton: {
    height: 75,
    width: 75,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  }
});