import React from 'react';
import TableListPage from './Components/TableListPage'
import PreparationListPage from './Components/PreparationListPage'
import TableDetail from './Components/TableDetail'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';
import AppContext from './contexts/AppContext'
import { getFoods } from './API/client'

const globals = require('./consts')

function TableListScreen({ navigation }) {
  return (
    <TableListPage navigation={navigation} />
  )
}

function PreparationListScreen({ navigation }) {
  return (
    <PreparationListPage navigation={navigation} filter={'food'} />
  )
}


function BarListScreen({ navigation }) {
  return (
    <PreparationListPage navigation={navigation} filter={'bar'} />
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
      <PreparationListStack.Screen name="PreparationList" component={PreparationListScreen} options={{ title: 'Cuisine' }} />
    </PreparationListStack.Navigator>
  );
}

function BarStackScreen() {
  return (
    <BarStack.Navigator initialRouteName="Bar">
      <BarStack.Screen name="Bar" component={BarListScreen} options={{ title: 'Bar' }} />
    </BarStack.Navigator>
  );
}


function TableDetailScreen({ route, navigation }) {
  return (
    <TableDetail navigation={navigation} route={route} />
  )
}

const TableListStack = createStackNavigator();
const PreparationListStack = createStackNavigator();
const BarStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: io.connect(globals.API_HOST, {
        transports: ['websocket'],
        reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
      }),
      foods: [],
    }
  }

  componentDidMount() {
    getFoods().then(foods => {
      this.setState({ foods: foods });
    })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Tables') {
                  return <MaterialIcon name="restaurant" size={30} />
                } else if (route.name === 'Cuisine') {
                  return <MaterialCommunityIcon name="chef-hat" size={30} />
                } else {
                  return <MaterialCommunityIcon name="beer" size={30} />
                }
              },
            })}>
            <Tab.Screen name="Tables" component={TableStackScreen} />
            <Tab.Screen name="Cuisine" component={PreparationStackScreen} />
            <Tab.Screen name="Bar" component={BarStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    );
  }

}
