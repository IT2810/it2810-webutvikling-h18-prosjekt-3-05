import React from 'react';
import {View,
        Text,
        ScrollView,
        StyleSheet,
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.containerText}> Hello. Here are your settings. </Text>
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
  }
});
