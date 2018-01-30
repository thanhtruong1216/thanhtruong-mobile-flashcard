import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, AppRegistry, } from 'react-native';
import { getDecks } from '../utils/api/';
import { getDeck } from '../utils/api/';
import { fetchDecks} from '../actions';
import { connect } from 'react-redux';
import decks from '../reducers';
import FlipCard from 'react-native-flip-card';
import { NativeRouter, Route, Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import Deck from './Deck';
import CreateDeck from './CreateDeck';

import QuizPage from './QuizPage';

class Decks extends Component {
  state = {
    decks: {},
    flip: false,
  }
 
  static navigationOptions = { title: 'Decks' };

  openDeckPage = (title) => {
    this.props.navigation.navigate('Deck', {title})
  }

  componentDidMount() {
    getDecks()
    .then((decks) => {
      this.setState({decks})
    })
  }


  render() {
    const {decks} = this.state;

    return(
      <ScrollView style={styles.container}>
        { Object.keys(decks).map(key => (
          <View style={styles.container}>
            <Button onPress = {() => this.openDeckPage(decks[key].title) } title={decks[key].title}/>
            <Text>{decks[key].questions.length} card </Text> 
          </View>
          )
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  card: {
    width: 200,
    height: 120,
    marginTop: 5,
    borderWidth: 0,
  },
  cardTitle: {
    color: 'brown',
    fontSize: 20
  },
  face: {
    width: 200,
    flex:1,
    backgroundColor: 'mediumseagreen',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  back: {
    width: 200,
    flex:1,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight:10
  }
});

export default Decks =  StackNavigator({
  First: {screen: Decks},
  Deck: {screen: Deck},
  Quiz: {screen: QuizPage},
  AddCardToDeck: {screen: CreateDeck}
})