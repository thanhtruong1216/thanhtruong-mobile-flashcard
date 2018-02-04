import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { getDecks, getDeck } from '../utils/api/';
import { fetchDecks} from '../actions';
import FlipCard from 'react-native-flip-card';
import { StackNavigator } from 'react-navigation';
import QuizPage from './QuizPage';
import {connect} from 'react-redux';
import { purple, white } from '../utils/colors';

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    const {title} =  navigation.state.params
    return {
      title: title
    }
  }

  openQuizPage = (title) => {
    this.props.navigation.navigate('Quiz', {title})
  }

  openAddCardToDeckPage = (title) => {
    this.props.navigation.navigate('AddCardToDeck', {title})
  }
  
  render() {
    const { title } = this.props.navigation.state.params;
    const { decks } = this.props;
    const deck = decks[title];
    return(
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.title}>
            <Text style={styles.cardTitle}>{deck.title}</Text>
            <Text>{deck.questions.length} cards</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress= {() => this.openAddCardToDeckPage(deck.title)} title="Add card"
              style={styles.button}>
              <Text style={{color: white}}>Add card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress = {() => this.openQuizPage(deck.title)} 
              style={styles.button}> 
              <Text style={{color: white}}>Start Quiz</Text>
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
    lineHeight: 20,
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
    height: 50,
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
  },
  button: {
    borderRadius: 5, 
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: purple
  },
  buttonContainer: {
    flex: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 10, 
    margin: 5
  }
});
const mapStateToProps =(state,  {navigation}) => {
  const {title} = navigation.state.params
  return {
    title,
    decks: state.decks
  }
}
export default connect(mapStateToProps)(Deck);