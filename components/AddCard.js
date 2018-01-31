import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class AddCardToDeck extends Component {
  state = {
    question: 'Add question here',
    answer: 'Add answer here'
  }
  static navigationOptions = { title: 'Add card' };
  render() {
    const { question, answer} = this.state;

    return(
      <View style={styles.container}>
        <TextInput style={styles.input} value={question}/>
        <TextInput style={styles.input} value={answer}/>
        <View style={{flex: 1, margin: 5, width: 150}}>
         <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, alignItems: 'center', padding:10}}>
          <Text>Submit</Text>
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
})
export default AddCardToDeck