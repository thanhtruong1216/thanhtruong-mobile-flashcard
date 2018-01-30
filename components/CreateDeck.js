import React, { Component } from 'react'
import {
  AsyncStorage, 
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TouchableOpacity } from 'react-native';
import STORAGE_KEY from '../utils/api';

function SubmitBtn({onPress}) {
  return(
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>Add deck</Text>
    </TouchableOpacity>
  );
}
class CreateDeck extends Component {
  state = {
    inputContent: 'What title do u want?',
    deck: null
  }
  componentDidMount = () => AsyncStorage.getItem('inputContent').then((value) => this.setState({inputContent: value}))

  setInputContent = (value) => {
    const {inputContent} = this.state;
    AsyncStorage.setItem(inputContent, value);
    this.setState({inputContent: value});
  }

  submit = () => {
    const key = STORAGE_KEY
    const deck= this.state
    this.props.dispatch(addDeck({
      [key]: deck
    }))
    this.setState((state) => ({
      deck: null
    }))
  }
  
  render() {
    const {inputContent} = this.state
      return(
        <KeyboardAvoidingView style= {styles.container}>
          <TextInput 
            value={inputContent} 
            style= {styles.textInput} 
            autoCapitalize = 'none' 
            onChangeText = {this.setInputContent}/>
          <Text>{this.state.inputContent}</Text>
         <SubmitBtn onPress={this.submit}/>
        </KeyboardAvoidingView>
      );
  }
}
export default CreateDeck;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  textInput: {
    width: 200,
    margin: 15,
    height: 35,
    borderWidth: 1,
    backgroundColor: '#7685ed'
  }, 
  button: {
    padding: 10,
    backgroundColor: '#E53224'
  }
})