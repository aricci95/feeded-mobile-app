import React from 'react';
import TableListPage from './Components/TableListPage'
import TableDetail from './Components/TableDetail'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function TableListScreen({ navigation }) {
  return (
    <TableListPage navigation={navigation} />
  )
}

function TableDetailScreen({ route, navigation }) {
  return (
    <TableDetail navigation={navigation} route={route} />
  )
}

const TableListStack = createStackNavigator();

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
        <TableListStack.Navigator initialRouteName="TableList">
          <TableListStack.Screen name="TableList" component={TableListScreen} options={{ title: 'Tables' }} />
          <TableListStack.Screen name="TableDetail" component={TableDetailScreen} options={{ title: 'Détail Table' }} />
        </TableListStack.Navigator>
      </NavigationContainer>
    );
  }

}
