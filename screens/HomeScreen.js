import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { WebBrowser } from 'expo';
import { FAB, Title, Caption } from 'react-native-paper';
import TodosScreen from './TodosScreen';
import LocalImage from '../components/LocalImage';
import FadeInView from '../components/FadeInView';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goals: []
    };
  }
  static navigationOptions = {
    title: 'My Goals',
  };

/*** Listens to changes when a new Goal is added ***/
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.retrieveGoals();
    })
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
  }
/*** Get a list of all stored Goal-objects from AsyncStorage
 and update local goals-array(which is declared in the constructor) ***/
  async retrieveGoals() {
    try {
      this.retrieveItem('goals').then((goals) => {
        if(goals) {
          this.setState({ goals })
        }
      })
    } catch(error) {
      console.log(error.message);
    }
  }

/*** Delete all the goals from AsyncStorage
and remove all corresponding goal-buttons from the View ***/
  async handleDelete() {
    try{
      let deleteItems = await AsyncStorage.removeItem('goals');
      this.setState({
        goals: []
      })
    } catch(error) {
      console.error(error.message);
    }
  }

/*** Returns a button for each stored Goal and parsing necessary goal-parameters to TodosScreen.js ***/
  displayGoals() {
    const {navigate} = this.props.navigation;
    if(!(this.state.goals == [])){
      // Iterating through all the saved Goal-objects
      return  this.state.goals.map(function(goal){
        return  <FAB icon="assignment-turned-in"
                  style={styles.fab}
                  label={goal.name}
                  key = {goal.name}
                  onPress={() =>
                    navigate('ToDo', {
                      goal_name: goal.name,
                    })
                  }
                  />
                })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Title style={styles.title}> Kickstart your motivation now! </Title>
              <View style={styles.logo}>
                {/*Intro-logo with animation */}
                <FadeInView>
                  <LocalImage
                    source={require('../assets/images/logo.png')}
                    originalWidth={1276}
                    originalHeight={1280} />
                  </FadeInView>
                  {/* Get-started tips */}
                  <Caption
                    style={[styles.getStartedContainer, {marginTop: '8%'}]}>
                    Add a new Goal by clicking '+' below
                  </Caption>
              </View>
              {/* All the Goals */}
              <View style={styles.goals}>
              {this.displayGoals()}
              </View>
          </View>
        </ScrollView>

        {/* Tab Bar with buttons for adding a new Goal and deleting all displayed goals */}
        <View style={styles.tabBar}>
          <FAB
            icon="add"
            style={[styles.fab, {backgroundColor: '#0e171c'}]}
            onPress={() => this.props.navigation.navigate('CreateGoal')}
            />
          <FAB
            icon="delete"
            label="delete all goals"
            style={[styles.fab, {backgroundColor: '#0e171c'}]}
            onPress={() => {
              this.handleDelete();
            }}
            />
        </View>
      </View>
    );
  }
}

/*** Styles ***/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01194f',
  },
  contentContainer: {
    paddingTop: 10,
    marginBottom: '30%',
  },
  title: {
    color: '#039cfd',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    backgroundColor: '#01194f',
    paddingVertical: 10,
  },
  logo: {
    alignItems: 'center',
    marginTop: '7%',
  },
  goals: {
    alignItems: 'center',
    paddingTop: '2%',
    marginBottom: '10%',
  },
  fab: {
    padding: 1,
    marginTop: 8,
  }
});
