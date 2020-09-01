// Components/tableDetail.js

import React from 'react'
import { StyleSheet, View, Text, TextInput, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { getTable, searchFoods, getFoods } from '../API/client'
import Autocomplete from 'react-native-autocomplete-input'

class TableDetail extends React.Component {
    constructor(props) {
        super(props);

        this.searchedText = ""

        this.state = {
            table: undefined,
            isLoading: true,
            foods: [],
            query: '',
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
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
                    isLoading: false,
                    table: data,
                })
            })

        getFoods().then(foods => {
            this.setState({ foods });
        })
    }

    _displayTable() {
        if (this.state.table != undefined) {
            const { table } = this.state
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Text>{this.state.table.number}</Text>
                </ScrollView>
            )
        }
    }

    render() {
        const { query } = this.state;
        const foods = this.findFoods(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.main_container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    //data to show in suggestion
                    data={foods.length === 1 && comp(query, foods[0].label) ? [] : foods}
                    //default value if you want to set something in input
                    defaultValue={query}
                    /*onchange of the text changing the state of the query which will trigger
                    the findFilm method to show the suggestions*/
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Ajouter un plat"
                    renderItem={(data) => (
                        //you can change the view you want to show in suggestion from here
                        <TouchableOpacity onPress={() => this.setState({ query: data.item.label })}>
                            <Text style={styles.itemText}>
                                <Text style={styles.boldItemText}>{data.item.type}</Text>
                                <Text> - </Text>
                                <Text>{data.item.label}</Text>
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                {this._displayTable()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
        marginTop: 40,
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
    boldItemText: {
        fontWeight: 'bold',
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
    },
    main_container: {
        flex: 1
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
    scrollview_container: {
        flex: 1
    },
    favorite_container: {
        alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
    },
})

export default TableDetail