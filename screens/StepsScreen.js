import React from 'react';
import {View,
        Text,
        ScrollView,
        StyleSheet,
        AsyncStorage
} from 'react-native';
import StepCounter from '../components/Pedometer';
import { FAB, TextInput } from 'react-native-paper';

export default class StepsScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      stepsInput: 0,
      stepsGoal: 0,
      stepsGoalShouldShow: false,
      stepsInputShouldShow: false,
      newStepsButtonShouldShow: true,
      saveButtonShouldShow: false,
    }
  }
  
  static navigationOptions = {
    title: 'Steps'
  };

  componentDidMount() {
    this.stepsGoal = this.retrieveItem("stepsGoal");
    console.log("stepsGoal on mount: " + this.stepsGoal);
    if(!(this.stepsGoal === 0 || this.stepsGoal)){
      this.stepsGoalShouldShow = true;
    }
    console.log("stepsGoalShouldShow: " + this.stepsGoalShouldShow);
  }

  componentDidUpdate() {
    this.stepsGoal = this.retrieveItem("stepsGoal");
    console.log("stepsGoal on update: " + this.stepsGoal);
    if(!(this.stepsGoal === 0 || this.stepsGoal)){
      this.stepsGoalShouldShow = true;
    }
  }

  async storeItem(key, item) {
    try {
        var item = await AsyncStorage.setItem(key, JSON.stringify(item));
        console.log("Item was stored, stepsGoal: " + item);
        return item;
    } catch (error) {
        throw error;
    }
  }

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      console.log('Retrieved item, stepsGoal:' + item);
      return item;
    } catch (error) {
      throw error;
    }
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log("removed old stepsGoal")
    }
    catch(error) {
      throw error;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}> You have walked: </Text>
          <StepCounter />
          <Text style={styles.text}>today</Text>
          {this.state.stepsGoalShouldShow ? 
            <Text style={styles.text}>Daily Goal: {this.state.stepsGoal}</Text> : null}
          {this.state.newStepsButtonShouldShow ? 
            <FAB
              icon="add"
              label="Set Daily Goal"
              onPress={()=>{ this.setState({ stepsInputShouldShow: !this.state.stepsInputShouldShow, newStepsButtonShouldShow: !this.state.newStepsButtonShouldShow, saveButtonShouldShow: !this.state.saveButtonShouldShow})}}
              /> : null }
          {this.state.stepsInputShouldShow ? 
            <TextInput onChangeText={(text) => this.setState({stepsInput: text})} value={this.stepsInput} keyboardType='numeric' /> : null}
          {this.state.saveButtonShouldShow ?
            <FAB
              icon="save"
              label="Save Daily Goal"
              onPress={()=> this.removeItemValue("stepsGoal").then(this.storeItem("stepsGoal", this.stepsInput)).then(this.setState({stepsInputShouldShow: false, saveButtonShouldShow: false}))} /> : null}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#01194f',
  },
  containerText: {
    paddingTop: 30,
    fontSize: 17,
    color: '#2e78b7',
    lineHeight: 24,
    textAlign: 'center',
  },
  text: {
    paddingTop: 20,
    fontSize: 30,
    color: '#2e78b7',
    textAlign: 'center'
  }
});
