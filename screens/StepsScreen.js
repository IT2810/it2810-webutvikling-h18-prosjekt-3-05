import React from 'react';
import {View,
        Text,
        ScrollView,
        StyleSheet,
        AsyncStorage
} from 'react-native';
import StepCounter from '../components/StepCounter';
import LocalImage from '../components/LocalImage';
import { ProgressBar, Colors, FAB, TextInput } from 'react-native-paper';

export default class StepsScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      stepsInput: 0,
      stepsGoal: "",
      stepsGoalShouldShow: false,
      stepsInputShouldShow: false,
      newStepsButtonShouldShow: true,
      saveButtonShouldShow: false,
    }
  }

  static navigationOptions = {
    title: 'Steps'
  };

  // Retrieves the daily goal you've set previously, does not show your goal if you have no goal set
  componentDidMount() {
    this.retrieveItem("stepsGoal").then(item =>
      this.setState(
        {
          stepsGoal: item
        }
      )
    )
    if(!(this.state.stepsGoal === 0)){
      this.state.stepsGoalShouldShow = true;
    }
  }

  componentDidUpdate() {
    this.retrieveItem("stepsGoal").then(item => {
      if(this.state.stepsGoal != item){
        this.setState(
          {
            stepsGoal: item
          })
      }}
    );
    if(!(this.state.stepsGoal === 0)){
      this.state.stepsGoalShouldShow = true;
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
      return item;
    } catch (error) {
      throw error;
    }
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
    }
    catch(error) {
      throw error;
    }
  }
  // Renders various components conditionally, and show the users progress towards their goal, if one is set
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.stepsGoalShouldShow ?
            <Text style={styles.textGoal}>Daily Goal: {this.state.stepsGoal}</Text> : null}
              <Text style={styles.text}> You have walked: </Text>
              {this.state.stepsGoalShouldShow ?
                <StepCounter stepsGoal={this.state.stepsGoal}
              /> : null}
          {this.state.newStepsButtonShouldShow ?
            <FAB
              icon="add"
              style={styles.fab}
              label="Set Daily Goal"
              onPress={()=>{
                this.setState({
                   stepsInputShouldShow: !this.state.stepsInputShouldShow,
                   newStepsButtonShouldShow: !this.state.newStepsButtonShouldShow,
                   saveButtonShouldShow: !this.state.saveButtonShouldShow})}}
            /> : null }
          {this.state.stepsInputShouldShow ?
            <TextInput
              mode="outlined"
              style={styles.inputForm}
              keyboardType='numeric'
              onChangeText={(text) => this.setState({stepsInput: text})}
            /> : null}
          {this.state.saveButtonShouldShow ?
            <FAB
              icon="save"
              style={styles.fab}
              label="Save Daily Goal"
              onPress={()=> this.removeItemValue("stepsGoal")
              .then(this.storeItem("stepsGoal", this.state.stepsInput))
              .then(this.setState({stepsInputShouldShow: !this.state.stepsInputShouldShow,
                saveButtonShouldShow: !this.state.saveButtonShouldShow,
                 newStepsButtonShouldShow: !this.state.newStepsButtonShouldShow}))}
             /> : null}

             <LocalImage
                  style= {styles.logo}
                  source={require('../assets/images/runner.png')}
                  originalWidth={669}
                  originalHeight={1280} />
        </ScrollView>
      </View>
    );
  }
}

/*** Styling ***/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#01194f',
    alignItems: 'center'
  },
  containerText: {
    paddingTop: 10,
    color: '#039cfd',
    textAlign: 'center',
  },
  inputForm: {
    width: '94%',
    margin: 8,
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '5%',
  },
  text: {
    paddingTop: 10,
    fontSize: 20,
    color: '#039cfd',
    textAlign: 'center'
  },
  textGoal: {
    paddingTop: 10,
    paddingBottom: 15,
    fontSize: 25,
    color: '#039cfd',
    textAlign: 'center'
  },
  fab: {
    padding: 4,
    width: '100%',
    marginBottom: '3%'
  },
  logo: {
    alignItems: 'center',
    marginTop: '7%',
  }
});
