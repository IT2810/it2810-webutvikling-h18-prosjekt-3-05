import React from 'react';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  Keyboard
} from 'react-native';
import DatePicker from "react-native-datepicker";
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
      };
  }

  static navigationOptions = {
    title: 'Create New Goal',
  };

/*** Alert msg to call when user enters a name of already existing Goal-object***/
  isGoal() {
    Alert.alert(
      'Something went wrong...   :(',
      'This goal already exists',
      [{text: 'OK'}],
      {cancelable: false}
    )
  }

/*** Alert msg to call when user enters an empty Goal-name***/
  isEmpty() {
    Alert.alert(
      'Something went wrong...   :(',
      'The Title cannot be empty',
      [{text: 'OK'}],
      {cancelable: false}
    )
  }

/*** Adding a Goal-object into the goal-list and then saving it in storage.
If the Goal-object is the first one to be added,
creating a new list to store future Goal-objects in it ***/
  saveGoal() {
    var goal = new Goal(
                this.state.name,
                this.state.startDate,
                this.state.deadline,
                this.state.description,
              );
    var name = this.state.name
    this.retrieveItem('goals').then((item) => {
      if(Array.isArray(item)) {
        /*** retrieving names to check if this Goal exists already ***/
        check = item.map(function(goal){
          s = JSON.stringify(goal.name);
          key = {s};
          retrievedName = s.replace(/['"]+/g, '');
          return (retrievedName===name)
        })
          if (check.includes(true)) {
            this.isGoal();
          } else if(name.trim() == '') {
              this.isEmpty();
            /*** If everything is okay, can save this Goal ***/
          } else {
            item.push(goal);
            this.storeItem('goals', item).then(() => {
              this.props.navigation.navigate('Home')
            });
          }
      } else {
        /*** If no Goal-objects existing from before
        create an array to store the current one an the future ones ***/
        if(name.trim() == '') {
            this.isEmpty();
        } else {
          var newGoals = [];
          newGoals.push(goal);
          this.storeItem('goals', newGoals).then(() => {
            this.props.navigation.navigate('Home')
          });
        }
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

/*** Get the requested item from AsyncStorage and return it as a JS-object for further use  ***/
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
      <View style={styles.container} >
        <ScrollView style={styles.createGoal} >
        <KeyboardAwareScrollView viewIsInsideTabBar>
          <View>
              <Text style={styles.inputText}>Title</Text>
                {/*Getting input from user to name a Goal*/}
                <TextInput
                    style={styles.inputForm}
                    mode="outlined"
                    maxLength = {35}
                    returnKeyType="done"
                    placeholder = "Enter your goal title here."
                    onChangeText={(text) =>
                        this.setState({name: text})
                    }
                />

              <Text style={styles.inputText}>Description</Text>
                {/*Getting input from user to add a description to a Goal*/}
                <TextInput
                    style={[styles.inputForm, {height: 130}, {paddingTop: 8}]}
                    multiline={true}
                    mode="outlined"
                    maxLength = {150}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder = "Describe your goal."
                    onChangeText={(text) =>
                    this.setState({description: text})}
                />

              <Text style={styles.inputText}>Deadline</Text>
                {/*Getting input from user to set deadline for a Goal*/}
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
                </View>
              </KeyboardAwareScrollView>
        </ScrollView>
        <View style={styles.button}>
        {/*Button for saving a Goal-object*/}
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
  var Goal = function (name, startDate, deadline, description) {
    this.name = name;
    this.startDate = startDate;
    this.deadline = deadline;
    this.description = description;
  }

/*** Styling ***/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#01194f',
    },
    createGoal: {
      marginBottom: '30%',
    },
    inputText: {
      paddingTop: '3%',
      marginLeft: '4%',
      marginBottom: '1%',
      fontSize: 15,
      color: '#039cfd',
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
