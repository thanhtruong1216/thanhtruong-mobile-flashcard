import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Button, AppRegistry, TouchableOpacity} from 'react-native';
import { getDecks } from '../utils/api/';
import { getDeck } from '../utils/api/';
import { fetchDecks } from '../actions';
import { connect } from 'react-redux';
import decks from '../reducers';
import FlipCard from 'react-native-flip-card';
import { NativeRouter, Route, Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';
import Deck from './Deck';
import CreateDeck from './CreateDeck';
import QuizPage from './QuizPage';
import AddCardToDeck from './AddCard';
import {setLocalNotification} from '../utils/api';
import { purple, white, gray} from '../utils/colors';

class DecksList extends Component { 
  static navigationOptions = ({navigation}) => {
    return {
      title: "Decks"
    }
  }

  openDeckPage = (title) => {
    this.props.navigation.navigate('Deck', {title})
  }

  componentDidMount() {
    const { handleFetchDecks } = this.props;
    getDecks()
      .then((decks) => {
        handleFetchDecks(decks);
      })
  }

  render() {
    const { decks } = this.props;
    return(
      <ScrollView contentContainerStyle={styles.container}>
        { Object.keys(decks).map(key => (
          <View key={key} style={styles.mainContent}>
            <TouchableOpacity style={styles.card} onPress = {() => this.openDeckPage(decks[key].title) }>
              <Text style={styles.title}>{decks[key].title}</Text>
            </TouchableOpacity>
            <Text>{decks[key].questions.length} cards </Text> 
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
    marginTop: 20,
  },
  mainContent: {
    marginBottom: 20, 
    paddingBottom: 5,
    width: 200, 
    alignItems: 'center', 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1
  },
  card: {
    height: 50,
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
  }, 
  title: {
    fontSize: 25, 
    color:'brown'
  }
});

const mapStateToProps = state => {
  return {
    decks: state.decks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFetchDecks: (decks) => {
      dispatch(fetchDecks({decks}));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DecksList)
// const ConnectedDecks = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DecksList)

// export default DecksList =  StackNavigator({
//   First: {screen: ConnectedDecks},
//   Deck: {screen: Deck},
//   Quiz: {screen: QuizPage},
//   AddCardToDeck: {screen: AddCardToDeck},
//   Back: {screen: Deck},
//   BackToDecks: {screen: ConnectedDecks},
// })