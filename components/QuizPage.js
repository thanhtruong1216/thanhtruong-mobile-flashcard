import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { getDecks, getDeck } from '../utils/api/';
import FlipCard from 'react-native-flip-card';
import {connect} from 'react-redux';
import { addRightAnswer, addWrongAnswer, reset } from '../actions';
import { purple, lightPurp } from '../utils/colors';

class QuizPage extends Component {
  state = {
    showScore: false,
  }

  static navigationOptions = { title: 'Quiz' };

  correctAnswer = (question) => {
    const {correctAnswerHandle, title} = this.props;
    correctAnswerHandle(title, question.question)
  }

  incorrectAnswer = (question) => {
    const {incorrectAnswerHandler, title} = this.props;
    incorrectAnswerHandler(title, question.question)
  }

  submit = () => {
    const {score} = this.props
    this.setState({
      showScore: true
    })
  }

  reset = () => {
    const { resetHandler, title} = this.props;
    resetHandler(title)
    this.setState({
      showScore: false
    })
  }

  render() {
    const { decks, score} = this.props;
    const { title } = this.props.navigation.state.params;
    const deck = decks[title]
    let result = null;
    let node = null
    if(this.state.showScore) {
      result = (
        <View>
          <Text>Corect answer rate is {score}%</Text>
        </View>
      )
    }
  
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.numberCard}>{deck.questions.length}/{deck.questions.length}</Text>
        { deck.questions && deck.questions.map(question => (
        <View style={styles.mainContent}>
          <View style={styles.container}>
            <FlipCard style={styles.card}>
              <View style={styles.face}>
                <Text style={styles.question}>{question.question}</Text>
                <Text style={styles.answer}>ANSWER</Text>
              </View>
              <View style={styles.back}>
                <Text style={styles.question}>{question.answer}</Text>
                <Text style={styles.answer}>QUESTION</Text>
              </View>
            </FlipCard>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.correctAnswer(question)}
              style={styles.correctButton}>
              <Text style={{color:'white'}}>Correct</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => this.incorrectAnswer(question)}
              style={styles.incorrectButton}>
              <Text style={{color:'white'}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>

        ))}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={this.submit}>
            <Text style={{color:'white'}}>Submit</Text>
          </TouchableOpacity>
          {result}
        
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={this.reset}>
            <Text style={{color:'white'}}>Reset</Text>
          </TouchableOpacity>
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
    marginBottom: 30
  },
  buttonContainer: {
    width: 200, 
    flex: 1, 
    margin: 5,
  },
  card: {
    width: 300,
    height: 200,
    borderWidth: 0,
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10
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
  correctButton: {
    backgroundColor: 'green', 
    borderRadius: 5,
    alignItems: 'center', 
    padding:10
  },
  incorrectButton: {
    backgroundColor: 'brown', 
    borderRadius: 5,
    alignItems: 'center', 
    padding:10
  },
  submitButton: {
    borderRadius: 5, 
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: purple,
    margin:5
  },
  resetButton: {
   borderRadius: 5, 
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: purple,
    margin:5
  },
  butonTex: {
    color: 'white'
  },
  answer: {
    height: 100, 
    color:'brown',
    alignItems: 'center',
    paddingTop: 50,
    fontSize: 20
  },
  question: {
    color: 'brown', 
    fontSize: 15
  }
});

const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params
  const {rightAnswers, wrongAnswers, decks} = state
  const rightAnswersCount = rightAnswers.filter(obj => obj.title === title).length
  const wrongAnswersCount = wrongAnswers.filter(obj => obj.title === title).length
  let score = 0;
  if(rightAnswersCount + wrongAnswersCount !== 0) {
    score = rightAnswersCount/(wrongAnswersCount + rightAnswersCount) * 100;
  }

  console.log({rightAnswers, wrongAnswers, score})
  return {
    title,
    decks,
    score,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    correctAnswerHandle: (title, question) => {
      dispatch(addRightAnswer({title, question}))
    },
    incorrectAnswerHandler: (title, question) => {
      dispatch(addWrongAnswer({title, question}))
    },
    resetHandler: (title) => {
      dispatch(reset({title}))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizPage)


