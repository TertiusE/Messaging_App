import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  colourButton: {
    height: 75,
    width: 75,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  }
});