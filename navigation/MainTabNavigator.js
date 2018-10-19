import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StepsScreen from '../screens/StepsScreen';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import TodosScreen from '../screens/TodosScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  CreateGoal: CreateGoalScreen,
  ToDo: TodosScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'My Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-trophy${focused ? '' : '-outline'}`
          : 'md-trophy'
      }
    />
  ),
};

const StepsStack = createStackNavigator({
  Steps: StepsScreen,
});

StepsStack.navigationOptions = {
  tabBarLabel: 'Steps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-walk${focused ? '' : '-outline'}` : 'md-walk'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  StepsStack,
});
