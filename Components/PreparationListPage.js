import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { getPreparations } from '../API/client'
import PreparationItem from './PreparationItem'
import AppContext from '../contexts/AppContext'
import io from 'socket.io-client';
const globals = require('../consts')

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    flat_list: {
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
        justifyContent: 'center'
    }
})

export default function PreparationListPage(props) {
    const [state, setState] = React.useState({
        preparations: [],
    })

    const _loadPreparations = (notification = null) => {
        getPreparations(props.filter)
            .then(data => {
                setState({
                    preparations: data,
                })
            })
    }

    const socket = React.useContext(AppContext);

    socket.on('notification', _loadPreparations);

    React.useEffect(() => _loadPreparations(), [])

    return (
        <View style={styles.main_container}>
            <FlatList
                contentContainerStyle={styles.flat_list}
                data={state.preparations}
                keyExtractor={(item, index) => index.toString()}
                extraData={state.preparations}
                renderItem={({ item }) => <PreparationItem preparation={item} />}
            />
        </View>
    )
}