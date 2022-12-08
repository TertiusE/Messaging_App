import { React, useState, useRef } from "react";
import { Text, View, StyleSheet, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Dropdown = ({ label, data, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [pageY, setPageY] = useState();

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
    setDropdownTop(pageY);
    //console.log(dropdownTop);
  };

  const openDropdown = () => {
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      co
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    {
      //console.log(visible);
    }
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={toggleDropdown}>
        <View style={[styles.dropdown, { top: dropdownTop }]}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </TouchableOpacity>
    </Modal>;
  };

  return (
    <TouchableOpacity
      style={styles.button}
      ref={DropdownButton}
      onPress={toggleDropdown}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        setPageY(height);
      }}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(selected && selected.label) || label}
      </Text>
      <Ionicons name="chevron-down" size={30} color='#A6A6A6'/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 1,
    borderColor:"#E8E8E8",
    borderTopWidth:1,
    borderBottomWidth:1,
  },
  buttonText: {
    flex: 1,
    textAlign: "flex-start",
    fontSize:18, 
    fontWeight:'600', 
    color:'#A6A6A6'
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Dropdown;
