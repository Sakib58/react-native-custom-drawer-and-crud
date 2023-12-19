import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CustomDrawer from './components/CustomDrawer';
import MenuScreen111 from './screens/MenuScreen111';
import MenuScreen112 from './screens/MenuScreen112';
import MenuScreen2 from './screens/MenuScreen2';
import MenuScreen12 from './screens/MenuScreen12';
import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import ViewScreen from './screens/ViewScreen';
import UpdateScreen from './screens/UpdateScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [props, setProps] = useState(null);

  const db = openDatabase({name: 'blog-app.db', location: 'default'});

  useEffect(()=>{
    console.log("Opening db........")
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='blog_posts'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS blog_posts', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS blog_posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT NOT NULL, post TEXT NOT NULL)',
              []
            );
          }
        }
      );
    });
  }, []);

  const menuData = [
    { id: 0, label: 'Home', screen: 'Home', parentId: -1 },
    { id: 1, label: 'Menu 1', screen: 'Home', parentId: -1, submenus: [
      { id: 3, label: 'SubMenu-1-1', screen: 'Home', parentId: 1, submenus: [
        { id: 5, label: 'SubSubMenu-1-1-1', screen: 'MenuScreen111', parentId: 3 },
        { id: 6, label: 'SubSubMenu-1-1-2', screen: 'MenuScreen112', parentId: 3 }
      ]},
      { id: 4, label: 'SubMenu-1-2', screen: 'MenuScreen12', parentId: 1 }
    ]},
    { id: 2, label: 'Menu 2', screen: 'MenuScreen2', parentId: -1 },
    { id: 3, label: 'Logout', screen: 'Login', parentId: -1 },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemPress = (screen, menu) => {
    setCurrentScreen(screen);
    toggleDrawer();
    setSelectedMenu(menu);
  };
  console.log(currentScreen);
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
        <HomeScreen setProps={setProps} setCurrentScreen={setCurrentScreen} navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen112' ? (
        <MenuScreen112 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen111' ? (
        <MenuScreen111 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen2' ? (
        <MenuScreen2 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'MenuScreen12' ? (
        <MenuScreen12 navigation={{ replace: setCurrentScreen }} />
      ) : currentScreen === 'ViewScreen' ? (
        <ViewScreen props = {props} navigation={{ replace: setCurrentScreen}} />
      ) : currentScreen === 'UpdateScreen' ? (
        <UpdateScreen props={props} setCurrentScreen={setCurrentScreen} navigation={{ replace: setCurrentScreen }} />
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
