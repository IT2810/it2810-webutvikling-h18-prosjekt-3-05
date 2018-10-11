import React from 'react';
import {
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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Goals',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText} >Some text here </Text>
            <StepCounter />
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <FAB
            icon="add"
            label="New Goal"
            onPress={() => this.props.navigation.navigate('CreateGoal')}
            />
        </View>
      </View>
    );
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
