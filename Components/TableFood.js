import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class TableFood extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.food.label}</Text>
                <Text style={styles.price}>{this.props.food.price + ' €'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        margin: 5,
    },
    label: {
        flex: 5,
    },
    price: {
        flex:2, 
        textAlign: 'right',
    }
})

export default TableFood