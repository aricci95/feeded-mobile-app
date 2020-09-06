import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { getTable, addFood, submitFood } from '../API/client'
import Autocomplete from 'react-native-autocomplete-input'
import TableFood from './TableFood'
import AppContext from '../contexts/AppContext'

const styles = StyleSheet.create({
    totalPrice: {
        margin: 5,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
        fontSize: 20,
    },
    acContainerStyle: {
        top: 0,
        left: 0,
        width: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 10
    },
    table_food_container: {
        flex: 10,
        backgroundColor: '#F5FCFF',
        marginTop: 40,
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
    },
    itemText: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    boldItemText: {
        fontWeight: 'bold',
    },
    labelItemText: {
        flex: 7,
        textAlign: 'center',
    },
    priceItemText: {
        flex: 2,
        color: 'grey',
        textAlign: 'right',
        fontStyle: 'italic',
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    main_container: {
        flex: 1,
        backgroundColor: '#81c8fb',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default function TableDetail(props) {
    const empty = ''
    const [state, setState] = React.useState({
        table: undefined,
        tableFoods: [],
        query: empty,
    })

    const _getTotalPrice = (state) => {
        let totalPrice = 0

        state.tableFoods.forEach(function (tableFood) {
            totalPrice = totalPrice + tableFood.price
        })

        return totalPrice
    }

    const findFoods = (query, foods) => {
        //method called everytime when we change the value of the input
        if (query === '' || query === undefined) {
            //if the query is null then return blank
            return [];
        }

        //making a case insensitive regular expression to get similar value from the film json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered film array according the query from the input
        return foods.filter(food => food.label.search(regex) >= 0);
    }

    React.useEffect(() => {
        getTable(props.route.params.id)
            .then(data => {
                setState({
                    table: data,
                    tableFoods: data.foods ? data.foods : [],
                    query: '',
                })
            })
    }, [])


    const _displayColor = (type) => {
        let css = {
            fontWeight: 'bold',
            flex: 2,
        }

        switch (type) {
            case 'Starter':
                css.color = 'green'
                return css

            case 'Plat':
                css.color = 'red'
                return css

            case 'Dessert':
                css.color = 'blue'
                return css

            case 'Boisson':
                css.color = 'gold'
                return css

            default:
                css.color = 'black'
                return css
        }
    }

    const _displayTable = () => {
        if (state.tableFoods && state.tableFoods.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.table_food_container}>
                        <FlatList
                            data={state.tableFoods}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={state.tableFoods}
                            renderItem={({ item }) => <TableFood food={item} displayColor={_displayColor} />}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.totalPrice}>Total : {_getTotalPrice(state) + ' €'}</Text>
                    </View>
                </View>
            )
        }
    }

    const _displaySubmitButton = () => {
        if (state.tableFoods && state.tableFoods.length > 0) {
            return (
                <Button title='Envoyer la suite' onPress={() => {
                    submitFood(state.table).then(table => setState({
                        table: state.table,
                        tableFoods: table.foods,
                        query: state.query,
                    }))
                }} />
            )
        }
    }

    const { query } = state;

    const { foods } = React.useContext(AppContext)

    const filteredfoods = findFoods(query, foods);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    const _addFoodToTable = (data) => {
        addFood(state.table, data.item).then(zob => {
            setState({
                table: state.table,
                tableFoods: state.tableFoods.concat([data.item]),
                query: '',
            })
        })
    }

    return (
        <View style={styles.main_container}>
            <View style={styles.acContainerStyle}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    //data to show in suggestion
                    data={filteredfoods.length === 1 && comp(query, filteredfoods[0].label) ? [] : filteredfoods}
                    value={state.query}
                    /*onchange of the text changing the state of the query which will trigger
                    the findFilm method to show the suggestions*/
                    onChangeText={text => setState({
                        table: state.table,
                        tableFoods: state.tableFoods,
                        query: text 
                    })}
                    placeholder="Ajouter un plat"
                    renderItem={(data) => (
                        //you can change the view you want to show in suggestion from here
                        <TouchableOpacity onPress={() => _addFoodToTable(data)}>
                            <View style={styles.itemText}>
                                <Text style={_displayColor(data.item.type)}>{data.item.type}</Text>
                                <Text style={styles.labelItemText}>{data.item.label}</Text>
                                <Text style={styles.priceItemText}>{data.item.price + ' €'}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {_displayTable()}
            {_displaySubmitButton()}
        </View>
    )
}

