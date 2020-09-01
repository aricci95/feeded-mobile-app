import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class TableItem extends React.Component {
    render() {
        const { table, displayDetailForTable } = this.props

        return (
            <TouchableOpacity style={styles.table_item_container} onPress={() => displayDetailForTable(table._id)}>
                <View style={styles.center_div}>
                    <Text style={styles.title_text}>{table.number}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    table_item_container: {
        flexDirection: 'row',
        backgroundColor: "white",
        margin: 1,
        flex: 1,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    center_div: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 114,
        width: 114,
    }
})

export default TableItem