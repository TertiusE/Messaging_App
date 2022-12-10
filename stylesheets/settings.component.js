import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container__dark: {
    flex: 1,
    backgroundColor: "#1A1A1D",
  },
  section: {
    borderColor: "#E8E8E8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  section__dark: {
    borderColor: "#494949",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    borderColor: "#E8E8E8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    zIndex: 1
  },
  sectionContent__dark: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1D",
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    borderColor: "#494949",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    zIndex: 1
  },
  sectionText: {
    flex: 1,
    textAlign: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    color: "#A6A6A6",
  },
  sectionText__dark: {
    flex: 1,
    textAlign: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  colourSection: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginVertical: 4,
    flexWrap: true,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  colourSection__dark: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginVertical: 4,
    flexWrap: true,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor:"#1A1A1D"
  },
  colourButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#5C4DF8",
    marginTop: 30,
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
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#5C4DF8",
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
  },
  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    shadowColor: "grey",
    textAlign: "center"
  },
});