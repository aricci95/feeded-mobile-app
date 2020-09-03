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
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

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
  state = {
    connected: false
  };

  socket = io.connect(SOCKET_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
  });

  componentDidMount() {
    this.onConnectSocket();
  }

  onConnectSocket = () => {
    //Vérification si socket n'est pas à null
    if (this.socket) {
      //Ecoute de l'évènement
      this.socket.on('connect', () => {
        this.socket.emit('email', 'aricci95@gmail.com'); // Emission d'un message

        //Modification du status de connexion
        this.setState({
          connected: true
        });
      });

      this.socket.on('message', function (message) {
        console.log('Le serveur a un message pour vous : ' + message.content);
      })

      this.socket.emit('message', 'Salut serveur, ça va ?');
    }
  }

  render() {
    return (
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
    );
  }

}
