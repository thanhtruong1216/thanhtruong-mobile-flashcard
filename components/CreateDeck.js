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
import { addDeck } from '../actions'
import { StackNavigator } from 'react-navigation';
import AddCardToDeck from './AddCard';

function SubmitBtn({onPress}) {
  return(
    <View style={{width: 150, margin: 5}}>
      <TouchableOpacity style={{backgroundColor: 'green', borderRadius: 5,alignItems: 'center', padding:10}} onPress={onPress}>
        <Text style={{color:'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
class CreateDeck extends Component {
  state = {
    inputContent: 'Deck title',
    deck: null
  }
  // componentDidMount = () => AsyncStorage.getItem('inputContent').then((value) => this.setState({inputContent: value}))

  // setInputContent = (value) => {
  //   const {inputContent} = this.state;
  //   AsyncStorage.setItem(inputContent, value);
  //   this.setState({inputContent: value});
  // }

  // submit = () => {
  //   const key = STORAGE_KEY
  //   const deck= this.state
  //   this.props.dispatch(addDeck({
  //     [key]: deck
  //   }))
  //   this.setState((state) => ({
  //     deck: null
  //   }))
  // }
  // openAddCardPage = () => {
  //   this.props.navigation.navigate('Add card')
  // }
  render() {
    const {inputContent} = this.state
      return(
        <KeyboardAvoidingView style= {styles.container}>
          <Text style={{color: 'brown',fontSize: 20}}>What is the title of your new deck?</Text>
            <TextInput 
              value={inputContent} 
              style= {styles.textInput} 
              autoCapitalize = 'none' 
              onChangeText = {this.setInputContent}/>
          <SubmitBtn onPress={this.submit}/>
        </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50, 
  },
  textInput: {
    width: 300,
    margin: 20,
    height: 50,
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius:5
  }, 
  button: {
    padding: 10,
    backgroundColor: '#E53224'
  }
})

export default CreateDeck;
