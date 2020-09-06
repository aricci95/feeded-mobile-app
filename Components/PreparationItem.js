import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { submitPreparations } from '../API/client'

class PreparationItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            preparation: this.props.preparation,
        }
    }

    render() {
        const { preparation } = this.state

        if (preparation && preparation.foods.length) {
            return (
                <TouchableOpacity
                    onLongPress={() => {
                        submitPreparations(preparation)
                        this.setState({preparation: undefined})
                    }}
                    style={styles.preparation_item_container}
                >
                    <View style={styles.preparation_container}>
                        <Text style={styles.title_text}>{'Table ' + preparation.number}</Text>
                        {preparation.foods.map(({ label, id }) => (
                            <Text style={styles.preparation_text} key={id}>{label}</Text>
                        ))}
                    </View>
                </TouchableOpacity>
            )
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    preparation_item_container: {
        margin: 3,
        flex: 1,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5,
    },
    preparation_text: {
        padding: 5,
        flex: 1,
    },
    preparation_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})

export default PreparationItem