  import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';


import { FAB } from 'react-native-paper';
import Pedometer from '../components/Pedometer';
import StepCounter from '../components/Pedometer';
import TodosScreen from './TodosScreen';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goals: [],
    };
  }

  static navigationOptions = {
    title: 'My Goals',
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.retrieveGoals();
    })
    this.retrieveGoals();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText} >Some text here </Text>
            <View>
              {this.displayGoals()}
              <StepCounter />
            </View>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <FAB
            style={styles.fab}
            color={'#fcfcfc'}
            icon="delete"
            label="Clear goals"
            onPress={() => {
              AsyncStorage.removeItem('goals');
              console.log("Emptied tha stuff!")
            }}
            />
          <FAB
            style={styles.fab}
            color={'#fcfcfc'}
            icon="add"
            label="New Goal"
            onPress={() => this.props.navigation.navigate('CreateGoal')}
            />
        </View>
      </View>
    );
  }

  async retrieveItem(key) {
    try{
          console.log('THIS IS YOUR KEY' + key);
          const retrievedItem =  await AsyncStorage.getItem(key);
          const item = JSON.parse(retrievedItem);
          console.log('ITEM ITEM ITEM ' + item)
          return item;
        } catch (error) {
          console.log(error.message);
        }
    return
  }

  async retrieveGoals() {
    try {
      this.retrieveItem('goals').then((goals) => {
        console.log("Here are all the" + goals);
        if(goals) {
          console.log('WHAT ARE GOALS? BABY, DONT HURT NO MORE! PLIS' + goals);
          this.setState({ goals })
        }
      }).catch((error) => {
        console.log(error);
      })
    } catch(error) {
      console.log(error.message);
    }
  }

/***Rendering a button for each stored Goal and parsing necessary goal-parameters to TodosScreen ***/
  displayGoals() {
    const {navigate} = this.props.navigation;
    if(!(this.state.goals == [])){
      console.log(this.state.goals)
     return  this.state.goals.map(function(goal){
        return <FAB icon="label"
                style={styles.fab}
                color={'#fcfcfc'}
                label={goal.name}
                key = {goal.name}
                onPress={() =>
                  navigate('ToDo', {
                    goal_name: goal.name,
                    startDate: goal.startDate,
                    deadline: goal.deadline,
                    goalSteps: goal.goalSteps,
                  })
                }
                />
        })
      }
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01194f',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: '#2e78b7',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
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
  },
  tabBarInfoText: {
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },
});
