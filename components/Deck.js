import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { getDecks, getDeck } from '../utils/api/';
import { fetchDecks} from '../actions';
import FlipCard from 'react-native-flip-card';
import { StackNavigator } from 'react-navigation';
import QuizPage from './QuizPage';

class Deck extends Component {
  state = {
    flip: false,
    deck: {
      questions: [],
      title: ''
    },
  }

  openQuizPage = (title) => {
    this.props.navigation.navigate('Quiz', {title})
  }

  openAddCardToDeckPage = () => {
    this.props.navigation.navigate('AddCardToDeck')
  }

  componentDidMount() {
    const { title } = this.props.navigation.state.params;
    getDeck(title)
      .then((deck) => {
        console.log({deck})
        this.setState({deck})
      })

  }

  render() {
    const { deck } = this.state;
    return(
        <ScrollView style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.cardTitle}>{deck.title} Deck</Text>
            <Text>{deck.questions.length} cards</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10, margin: 5}}>
            <TouchableOpacity 
              onPress={this.openAddCardToDeckPage} title="Add card"
              style={{borderWidth: 2, borderRadius: 5, width: 200,  alignItems: 'center', padding:10}}>
              <Text>Add card</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10, margin: 5}}>
            <TouchableOpacity 
              onPress = {() => this.openQuizPage(deck.title)} 
              style={{borderWidth: 2, width: 200, borderRadius: 5, alignItems: 'center', padding:10}}> 
              <Text>Start Quiz</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    flex: 1,
    alignItems: 'center',
    height: 300,
    lineHeight: 20
  },
  card: {
    width: 200,
    height: 120,
    marginTop: 5,
    borderWidth: 0,
  },
  cardTitle: {
    color: 'brown',
    fontSize: 20,
    height: 50
  },
  face: {
    width: 200,
    height: 120,
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

export default Deck;