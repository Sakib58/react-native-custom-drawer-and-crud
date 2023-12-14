import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

const CustomDrawer = ({ navigation, menuData, onClose, selectedMenu, onMenuSelect, expandedMenus }) => {
  const [localExpandedMenus, setLocalExpandedMenus] = useState([]);

  useEffect(() => {
    setLocalExpandedMenus(expandedMenus);
  }, [expandedMenus]);

  const handleMenuItemPress = (screen, menu) => {
    navigation.navigate(screen);
    onClose();
    onMenuSelect(menu);
    setLocalExpandedMenus([]);
  };

  const toggleSubMenu = (id) => {
    setLocalExpandedMenus((prevMenus) => {
      console.log(prevMenus, id)
      if (prevMenus.includes(id)) {
        return prevMenus.filter((menuId) => menuId !== id);
      } else {
        return [...prevMenus, id];
      }
    });
  };
  
  const renderMenuItems = (items, parentId = -1) => {
    return items.map((item) => (
      <View key={item.id}>
        <TouchableOpacity
          style={[styles.menuItem, selectedMenu?.id === item.id && styles.selectedMenuItem]}
          onPress={() => {
            if (item.submenus) {
              toggleSubMenu(item.id);
              onMenuSelect(item);
            } else {
              handleMenuItemPress(item.screen, item);
              if (parentId !== -1) {
                setLocalExpandedMenus([item.id]);
              }
            }
          }}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
        {item.submenus && localExpandedMenus.includes(item.id) && (
          <View style={{ marginLeft: 20 }}>
            {renderMenuItems(item.submenus, item.id)}
          </View>
        )}
      </View>
    ));
  };
  

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        {renderMenuItems(menuData)}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 48,
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRightWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedMenuItem: {
    backgroundColor: '#e0e0e0',
  },
});

export default CustomDrawer;
