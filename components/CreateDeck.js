import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  AsyncStorage, 
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TouchableOpacity,
  } from 'react-native';
import STORAGE_KEY from '../utils/api';
import {setLocalNotification, clearLocalNotification, saveDeckTitle} from '../utils/api';
import { addDeck } from '../actions'
import { StackNavigator } from 'react-navigation';
import AddCardToDeck from './AddCard';
import { NavigationActions, navigation} from 'react-navigation';
import { purple, white, blue} from '../utils/colors';

class CreateDeck extends Component {
  state = {
    input: 'Deck title',
  }
 static navigationOptions = ({navigation}) => {
  return {
    title: "Add deck"
  }
 }
  handleTextChange = (input) => {
    this.setState({input});
  }

  submit = () => {
    const {input} = this.state
    const {addDeckHandler} = this.props;
    saveDeckTitle(input).then(() => {
      addDeckHandler(input)
      this.props.navigation.navigate('Deck', {title: input})
    })
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    const {input} = this.state
      return(
        <KeyboardAvoidingView style= {styles.container}>
          <Text style={styles.heading}>What is the title of your new deck?</Text>
            <TextInput 
              clearTextOnFocus={true}
              value={input} 
              style= {styles.textInput} 
              autoCapitalize = 'none' 
              onChangeText = {this.handleTextChange}/>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={{color:'white'}}>Submit</Text>
          </TouchableOpacity>
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
    borderRadius: 5, 
    alignItems: 'center', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: purple,
  },
  heading: {
    color: 'brown', 
    fontSize: 20
  }
})
const mapStateToProps = state => {
  return {
   input: state.input
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addDeckHandler:(title) => {
      dispatch(addDeck({title}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);
