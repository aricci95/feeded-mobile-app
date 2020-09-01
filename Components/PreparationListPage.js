import React from 'react'
import { StyleSheet, View } from 'react-native'

class PreparationListPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
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
});

export default PreparationListPage