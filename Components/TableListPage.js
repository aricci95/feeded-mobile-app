import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { getTables } from '../API/client'
import TableItem from './TableItem'

class TableListPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tables: [],
        }
    }

    componentDidMount() {
        getTables()
            .then(data => {
                this.setState({
                    tables: data,
                })
            })
    }

    _displayDetailForTable = (id) => {
        this.props.navigation.navigate("TableDetail", { id: id })
    }

    render() {
        return (
            <View style={styles.table_list_container}>
                <FlatList
                    contentContainerStyle={styles.table_list}
                    data={this.state.tables}
                    keyExtractor={(item, index) => index}
                    extraData={this.state.tables}
                    numColumns={3}
                    renderItem={({ item }) => <TableItem table={item} displayDetailForTable={this._displayDetailForTable} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    table_list_container: {
        flex: 1,
        margin: 5,
        backgroundColor: '#81c8fb',
    },
    table_list: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TableListPage