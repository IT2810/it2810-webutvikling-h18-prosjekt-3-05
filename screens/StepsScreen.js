import React from 'react';
import {View,
        Text,
        ScrollView,
        StyleSheet,
} from 'react-native';
import StepCounter from '../components/Pedometer';

export default class StepsScreen extends React.Component {
  static navigationOptions = {
    title: 'Steps'
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}> You have walked: </Text>
          <StepCounter />
          <Text style={styles.text}>today</Text>
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
