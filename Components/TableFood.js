import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class TableFood extends React.Component {
    constructor(props) {
        super(props);
    }

    _displayColor(status) {
        let css = {
            flex: 5,
        }

        switch (status) {
            case 1:
                css.color = 'blue'
                css.fontStyle = 'italic'
                return css

            case 2:
                css.color = 'orange'
                return css

            case 3:
                css.color = 'black'
                return css

            default:
                css.color = 'blue'
                css.fontStyle = 'italic'
                return css
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={this._displayColor(this.props.food.status)}>{this.props.food.label}</Text>
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
        flex: 2,
        textAlign: 'right',
    }
})

export default TableFood