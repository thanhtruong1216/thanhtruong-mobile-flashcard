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
  static navigationOptions = { title: 'Deck' };
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

    console.log('from state {deck}', {deck})
    
    return(
      <View style={styles.container}>
        <Text style={styles.cardTitle}>{deck.title} Deck</Text>
        <ScrollView style={styles.container}>
          <Text>{deck.questions.length} cards</Text>
          {/*{ deck.questions && deck.questions.map(question => (
            <View style={styles.container}>
              <Text style={styles.cardTitle}>{question.question}</Text>
              <Text>{question.answer}</Text>
            </View>
          ))}*/}
          <Button onPress={this.openAddCardToDeckPage} title="Add card"/>
          <Button onPress={this.openQuizPage} title="Start Quiz"/>
        </ScrollView>
      </View>
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