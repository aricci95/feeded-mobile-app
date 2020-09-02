import React from 'react';
import TableListPage from './Components/TableListPage'
import PreparationListPage from './Components/PreparationListPage'
import TableDetail from './Components/TableDetail'
import { StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function TableListScreen({ navigation }) {
  return (
    <TableListPage navigation={navigation} />
  )
}

function PreparationListScreen({ navigation }) {
  return (
    <PreparationListPage navigation={navigation} />
  )
}


function TableStackScreen() {
  return (
    <TableListStack.Navigator initialRouteName="TableList">
      <TableListStack.Screen name="TableList" component={TableListScreen} options={{ title: 'Tables' }} />
      <TableListStack.Screen name="TableDetail" component={TableDetailScreen} options={{ title: 'Détail Table' }} />
    </TableListStack.Navigator>
  );
}

function PreparationStackScreen() {
  return (
    <PreparationListStack.Navigator initialRouteName="PreparationList">
      <PreparationListStack.Screen name="PreparationList" component={PreparationListScreen} options={{ title: 'Préparations' }} />
    </PreparationListStack.Navigator>
  );
}


function TableDetailScreen({ route, navigation }) {
  return (
    <TableDetail navigation={navigation} route={route} />
  )
}

const TableListStack = createStackNavigator();
const PreparationListStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Tables') {
                return <MaterialIcon name="restaurant" size={30} />
              } else {
                return <MaterialCommunityIcon name="food" size={30} />
              }
            },
          })}>
          <Tab.Screen name="Tables" component={TableStackScreen} />
          <Tab.Screen name="Preparations" component={PreparationStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}
