import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { getDecks, getDeck } from '../utils/api/';
import FlipCard from 'react-native-flip-card';

export default class QuizPage extends Component {
 state = {
    deck: {
      questions: [],
      title: ''
    },
  }
  static navigationOptions = { title: 'Quiz' };

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
        <Text style={styles.numberCard}>{deck.questions.length}/{deck.questions.length}</Text>
        { deck.questions && deck.questions.map(question => (
        <View style={styles.container}>
          <View style={styles.container}>
            <FlipCard style={styles.card}>
              <View style={styles.face}>
                <Text style={{color: 'brown', height: 50}}>{question.question}</Text>
                <Text style={{height: 100, color:'brown'}}>Answer</Text>
              </View>
              <View style={styles.back}>
                <Text style={{color: 'brown', height: 50}}>{question.answer}</Text>
                <Text style={{height: 100, color:'brown'}}>Question</Text>
              </View>
            </FlipCard>
          </View>
          <View style={{width: 200, flex: 1, justifyContent: 'center', paddingHorizontal: 10, margin: 5}}>
            <TouchableOpacity style={{backgroundColor: 'green', borderRadius: 5,alignItems: 'center', padding:10}}>
              <Text style={{color:'white'}}>Correct</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: 200, flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
            <TouchableOpacity style={{backgroundColor:"brown", borderRadius: 5, alignItems: 'center', padding:10}}>
              <Text style={{color:'white'}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>

        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: 200,
    height: 200,
    borderWidth: 0,
    marginTop: 10
  },
  cardTitle: {
    color: 'brown',
    fontSize: 20
  },
  face: {
    width: 200,
    height: 200,
    flex:1,
    
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  back: {
    width: 200,
    height: 200,
    flex:1,
   
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight:10
  },
  button: {
    padding: 10,
    margin: 10,
    width: 200
  },
  butonTex: {
    color: 'white'
  }
});


