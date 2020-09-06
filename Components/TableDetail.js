import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { getTable, getFoods, addFood, submitFood } from '../API/client'
import Autocomplete from 'react-native-autocomplete-input'
import TableFood from './TableFood'

class TableDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            table: undefined,
            tableFoods: [],
            foods: [],
            query: '',
        }
    }

    _getTotalPrice() {
        let totalPrice = 0

        this.state.tableFoods.forEach(function (tableFood) {
            totalPrice = totalPrice + tableFood.price
        })

        return totalPrice
    }

    findFoods(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
            //if the query is null then return blank
            return [];
        }

        const { foods } = this.state;
        //making a case insensitive regular expression to get similar value from the film json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered film array according the query from the input
        return foods.filter(food => food.label.search(regex) >= 0);
    }

    componentDidMount() {
        getTable(this.props.route.params.id)
            .then(data => {
                this.setState({
                    table: data,
                    tableFoods: data.foods ? data.foods : [],
                })
            })

        getFoods().then(foods => {
            this.setState({ foods });
        })
    }

    _displayColor(type) {
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

    _displayTable() {
        if (this.state.tableFoods && this.state.tableFoods.length > 0) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.table_food_container}>
                        <FlatList
                            data={this.state.tableFoods}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state.tableFoods}
                            renderItem={({ item }) => <TableFood food={item} displayColor={this._displayColor} />}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.totalPrice}>Total : {this._getTotalPrice() + ' €'}</Text>
                    </View>
                </View>
            )
        }
    }

    _displaySubmitButton() {
        if (this.state.tableFoods && this.state.tableFoods.length > 0) {
            return (
                <Button title='Envoyer la suite' onPress={() => {
                    submitFood(this.state.table).then(table => this.setState({
                        tableFoods: table.foods
                    }))
                }} />
            )
        }
    }

    _addFood(food) {
        addFood(this.state.table, food).then(foods => {
            this.setState({ query: '' })
        })
    }

    render() {
        const { query } = this.state;
        const foods = this.findFoods(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.main_container}>
                <View style={styles.acContainerStyle}>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        //data to show in suggestion
                        data={foods.length === 1 && comp(query, foods[0].label) ? [] : foods}
                        value={this.state.query}
                        /*onchange of the text changing the state of the query which will trigger
                        the findFilm method to show the suggestions*/
                        onChangeText={text => this.setState({ query: text })}
                        placeholder="Ajouter un plat"
                        renderItem={(data) => (
                            //you can change the view you want to show in suggestion from here
                            <TouchableOpacity onPress={() => addFood(this.state.table, data.item).then(foods => {
                                this.setState({
                                    query: '',
                                    tableFoods: this.state.tableFoods.concat([data.item]),
                                })
                            })}>
                                <View style={styles.itemText}>
                                    <Text style={this._displayColor(data.item.type)}>{data.item.type}</Text>
                                    <Text style={styles.labelItemText}>{data.item.label}</Text>
                                    <Text style={styles.priceItemText}>{data.item.price + ' €'}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {this._displayTable()}
                {this._displaySubmitButton()}
            </View>
        )
    }
}

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

export default TableDetail