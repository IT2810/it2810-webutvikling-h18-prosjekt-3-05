import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DatePicker from "react-native-datepicker";
import moment from 'moment';
import { FAB, TextInput } from 'react-native-paper';

export default class CreateGoalScreen extends React.Component {
  constructor(){
    super()
    const currentDate = new Date();
    this.saveGoal = this.saveGoal.bind(this)

    this.state = {
      startDate: moment(currentDate).format("YYYY-MM-DD").toString(),
      name: "",
      deadline: moment(currentDate).format("YYYY-MM-DD").toString(),
      description: "",
      currentSteps: 0,
      goalSteps: 0,
      };
  }

  static navigationOptions = {
    title: 'Create New Goal',
  };

/*** Adding a Goal-object into the goal-list and then saving it in storage.
If the Goal-object is the first one to be added, creating a new list to store future Goal-objects in it ***/
  saveGoal() {
    var goal = new Goal(
                this.state.name,
                this.state.startDate,
                this.state.deadline,
                this.state.description,
                this.state.currentSteps,
                this.state.goalSteps);
    this.retrieveItem('goals').then((item) => {
      if(Array.isArray(item)) {
        item.push(goal);
        this.storeItem('goals', item).then(() => {
          this.props.navigation.navigate('Home')
        });
      } else {
        var newGoals = [];
        newGoals.push(goal);
        this.storeItem('goals', newGoals).then(() => {
          this.props.navigation.navigate('Home')
        });
      }
    });
  }

  async storeItem(key, item) {
    try {
        var storeItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.error(error.message);
    }
  }

/*** WHAT DOES THIS ONE ACTUALLY DOES??? ***/
  async retrieveItem(key) {
    try{
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.error(error.message);
    }
  return
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputText}>Title</Text>
        <TextInput
            mode="outlined"
            style={styles.inputForm}
            placeholder = "Enter your goal title here."
            onChangeText={(text) =>
              this.setState({name: text})}
        />
        <Text style={styles.inputText}>Description</Text>
        <TextInput
            style={styles.inputForm}
            mode="outlined"
            placeholder = "Describe your goal."
            onChangeText={(text) =>
            this.setState({description: text})}
        />
        <Text style={styles.inputText}>Deadline</Text>
        <DatePicker
              style={styles.datePicker}
              date={this.state.deadline}
              mode="date"
              format="YYYY-MM-DD"
              minDate={this.state.currentDate}
              maxDate="2030-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                    dateInput: {
                      marginLeft: 30,
                    },
                    dateText: {
                      color: '#bcbcbc'
                    },
                    btnTextText: {
                      color: '#6200ee'
                    },
                    datePicker: {
                      borderTopColor: '#bcbcbc',
                    },
                  }}
              onDateChange={(date) => {this.setState({deadline: date})}}
              />
        <View style={styles.button}>
          <FAB
            style={styles.fab}
            color={'#fcfcfc'}
            icon="save"
            label="Save Goal"
            onPress={this.saveGoal}
            />
        </View>
      </View>
    );
  }
}

/*** A Goal-object ***/
var Goal = function (name, startDate, deadline, description, currentSteps, goalSteps) {
  this.name = name;
  this.startDate = startDate;
  this.deadline = deadline;
  this.description = description;
  this.currentSteps = currentSteps;
  this.goalSteps = goalSteps;
  this.stepsPercentage = function () {
    stepsPercentage = currentSteps/goalSteps;
    if(stepsPercentage >= 1){
      stepsPercentage = 1;
    }
    return stepsPercentage
  }
}

/*** Styling ***/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#01194f',
    },
    inputText: {
      paddingTop: '8%',
      marginLeft: '4%',
      marginBottom: '1%',
      fontSize: 17,
      color: '#039cfd',
    },
    inputForm: {
      width: '94%',
      margin: 8,
      marginLeft: '3%',
      marginRight: '3%',
      marginBottom: '3%',

    },
    datePicker: {
      width: '94%',
      marginLeft: '3%',
      marginRight: '3%',
      marginBottom: '3%',
    },
    button: {
      position: 'absolute',
      bottom: 7,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#01194f',
      paddingVertical: 15,
    },
  });
