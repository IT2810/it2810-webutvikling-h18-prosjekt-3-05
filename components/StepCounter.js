import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";

// https://docs.expo.io/versions/v30.0.0/sdk/pedometer
export default class StepCounter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        isPedometerAvaliable: false,
        pastSteps: 0,
        currentSteps: 0
    };
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    // Steps walked since component rendering
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentSteps: result.steps
      })
    });

    const end = new Date();
    const start = new Date();
    // Starts counting a new day at 4 am.
    start.setHours(4);
    start.setMinutes(0);
    // Fetches number of steps walked between two dates
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastSteps: result.steps });
      },
      error => {
        this.setState({
          pastSteps: "Could not get stepCount: " + error
        });
      }
    );
  };
// This function will not run when reloading the expo client and cause an error:
// "Already managing a GoogleApiClient with id 0"
// This issue will only occur when using the expo client
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.pastSteps+this.state.currentSteps} steps today</Text>
        <ProgressBar progress={(this.state.pastSteps+this.state.currentSteps)/this.props.stepsGoal} color={Colors.red800} />
        {(this.state.pastSteps+this.state.currentSteps) > this.props.stepsGoal ?
          <Text style={styles.goalReachedText}>Well done!</Text>: null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#01194f',
    },
    text: {
      paddingTop: 15,
      fontSize: 25,
      color: '#039cfd',
      textAlign: 'center'
    },
    goalReachedText: {
      fontSize: 20,
      color: '#039cfd',
      textAlign: 'center',
      paddingBottom: 15
    }
});

Expo.registerRootComponent(StepCounter);
