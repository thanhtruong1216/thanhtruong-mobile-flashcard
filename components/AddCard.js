import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { addCard } from '../actions';
import {connect} from 'react-redux';
import { addCardToDeck } from '../utils/api';
import { NavigationActions, navigation} from 'react-navigation';
import { purple, white, blue} from '../utils/colors';


class AddCard extends Component {
  state = {
    question: "Python is a high level programming language?",
    answer: 'Yes!'
  }
  static navigationOptions = { title: 'Add card' };

  submitCard = (e) => {
    e.preventDefault()
    const card = this.state;
    const { addCardHandler } = this.props;
    const { title } = this.props.navigation.state.params;
    addCardToDeck(card, title).then(() => {
      addCardHandler(card, title)
      this.props.navigation.goBack();
    })
  }
  cancel = (e) => {
    e.preventDefault()
    this.props.navigation.goBack();
  }
  handleTextQuestionChange = (question) => {
    this.setState({question})
  }

  handleTextAnswerChange = (answer) => {
    this.setState({answer})
  }
  render() {
    const { question, answer} = this.state;
    return(
      <View style={styles.container}>
        <TextInput 
          clearTextOnFocus="true" 
          onChangeText={this.handleTextQuestionChange} 
          style={styles.input} value={question}/>
        <TextInput 
          clearTextOnFocus="true"
          onChangeText={this.handleTextAnswerChange} 
          style={styles.input} value={answer}/>
        <View style={{flex: 1, margin: 5, width: 150}}>
        <TouchableOpacity style={styles.button} onPress={this.submitCard}>
          <Text style={{color:'white'}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{color:white}} onPress={this.cancel}>Cancel</Text>
        </TouchableOpacity>
       </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    borderRadius: 5, 
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: purple,
    margin: 5
  }
})
const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params
  const {questions} = state.decks[title]
  return {
    title,
    questions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addCardHandler: (card, title) => {
      dispatch(addCard({card, title}))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);