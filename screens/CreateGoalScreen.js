import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DatePicker from "react-native-datepicker";
import moment from 'moment';
import { FAB, TextInput } from 'react-native-paper';

export default class CreateGoalScreen extends React.Component {
  constructor(props){
    super(props)
    const currentDate = new Date();
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
    title: 'Create Goal',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.containerText}> Hello. Here you can create a new goal! </Text>
          <Text style={styles.inputText}>Title</Text>
          <TextInput style={styles.inputForm}
                onChangeText={(text) =>
                  this.setState({name: text})}
                placeholder = "Enter your goal title here."
               />
          <Text style={styles.inputText}>Description</Text>
          <TextInput style={styles.inputForm}
                onChangeText={(text) =>
                  this.setState({description: text})}
                placeholder = "Describe your goal."
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
                onDateChange={(date) => {this.setState({deadline: date})}}
                />
        </ScrollView>
        <View style={styles.button}>
          <FAB
            icon="save"
            label="Save Goal"
            onPress={() => this.props.navigation.navigate('Home')}
            />
        </View>
      </View>
    );
  }
}

var Goal = function (name, startDate, deadline, description, currentSteps, goalSteps) {
  this.name = name;
  this.startDate = startDate;
  this.deadline = deadline;
  this.description = description;
  this.currentSteps = currentSteps;
  this.goalSteps = goalSteps;
  /* TODO: Implement later!
  this.stepsPercentage = function () {
    
  }*/
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#01194f',
    },
    containerText: {
      paddingTop: 30,
      fontSize: 17,
      color: '#2e78b7',
      lineHeight: 24,
      textAlign: 'center',
    },
    inputText: {
      marginLeft: 10,
      fontSize: 17,
      color: '#2e78b7',
    },
    inputForm: {
      width: '94%',
      marginLeft: '3%',
      marginRight: '3%',
      marginBottom: '3%',
    },
    datePicker: {
      width: '94%',
      marginLeft: '3%',
      marginRight: '3%',

    },
    button: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#01194f',
      paddingVertical: 15,
    }
  });
