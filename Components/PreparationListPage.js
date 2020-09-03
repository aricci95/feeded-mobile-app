import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { getPreparations } from '../API/client'
import PreparationItem from './PreparationItem'

class PreparationListPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            preparations: [],
        }
    }

    componentDidMount() {
        getPreparations(this.props.filter)
            .then(data => {
                this.setState({
                    preparations: data,
                })
            })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    contentContainerStyle={styles.flat_list}
                    data={this.state.preparations}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.preparations}
                    renderItem={({ item }) => <PreparationItem preparation={item} />}
                />
            </View>
        )
    }
}

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
});

export default PreparationListPage