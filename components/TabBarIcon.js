import React from 'react';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

// Highlighting the navgiation tab you are currently on and fading those you have left
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}