import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CustomDrawer from './components/CustomDrawer';
import MenuScreen111 from './screens/MenuScreen111';
import MenuScreen112 from './screens/MenuScreen112';
import MenuScreen2 from './screens/MenuScreen2';
import MenuScreen12 from './screens/MenuScreen12';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState([]);

  const menuData = [
    { id: 1, label: 'Menu 1', screen: 'Home', parentId: -1, submenus: [
      { id: 3, label: 'SubMenu-1-1', screen: 'Home', parentId: 1, submenus: [
        { id: 5, label: 'SubSubMenu-1-1-1', screen: 'MenuScreen111', parentId: 3 },
        { id: 6, label: 'SubSubMenu-1-1-2', screen: 'MenuScreen112', parentId: 3 }
      ]},
      { id: 4, label: 'SubMenu-1-2', screen: 'MenuScreen12', parentId: 1 }
    ]},
    { id: 2, label: 'Menu 2', screen: 'MenuScreen2', parentId: -1 },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemPress = (screen, menu) => {
    setCurrentScreen(screen);
    toggleDrawer();
    setSelectedMenu(menu);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        {currentScreen !== 'Login' && (
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <Text>☰</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>{currentScreen}</Text>
      </View>

      {currentScreen === 'Login' ? (
        <LoginScreen navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'Home' ? (
        <HomeScreen navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen112' ? (
        <MenuScreen112 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen111' ? (
        <MenuScreen111 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen2' ? (
        <MenuScreen2 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen12' ? (
        <MenuScreen12 navigation={{ replace: setCurrentScreen }} />
      ) : (
        null
      )}

      {isDrawerOpen && (
        <CustomDrawer
          navigation={{ navigate: handleMenuItemPress }}
          menuData={menuData}
          onClose={() => setIsDrawerOpen(false)}
          selectedMenu={selectedMenu}
          onMenuSelect={(menu) => {
            setSelectedMenu(menu);
          }}
          expandedMenus={expandedMenus}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
