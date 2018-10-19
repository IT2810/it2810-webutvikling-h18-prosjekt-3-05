import React from 'react';
import color from 'color';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

//Theme styling provided by react-native-paper
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      accent: '#6200ee',
      text: '#ffffff',
      placeholder: color('#ffffff')
      .alpha(0.54)
      .rgb()
      .string(),
    }
  };

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <PaperProvider theme={theme} >
            <AppNavigator />
          </ PaperProvider>
        </View>
      );
    }
  }

  // Loads necessary resourses for the app
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo.png'),
        require('./assets/images/runner.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01194f',
  },
});
