import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";

// https://docs.expo.io/versions/v30.0.0/sdk/pedometer
// Does not work after reload with android currently, need to implement a fix for Google connection.
export default class StepCounter extends React.Component {
    state = {
        isPedometerAvaliable: "Check",
        pastSteps: 0,
        currentSteps: 0
    };
    
  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentSteps: result.steps
      })
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Pedometer is not avaliable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
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
        <Text style={styles.text}>
          Pedometer is avaliable: {this.state.isPedometerAvailable}
        </Text>
        <Text style={styles.text}>
          Steps taken in the last 24 hours: {this.state.pastSteps}
        </Text>
        <Text style={styles.text}>Walk! And watch this go up: {this.state.currentSteps}</Text>
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
        fontSize: 17,
        color: '#2e78b7'
    }
});

Expo.registerRootComponent(StepCounter);
