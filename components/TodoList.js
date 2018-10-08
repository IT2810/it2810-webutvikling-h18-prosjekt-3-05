import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      Dimensions,
      TextInput,} from 'react-native';

class TodoList extends Component {
  constructor(props) {
    super(props),
    this.state = {
      isEditing: false,
      isCompleted: false,
      todoValue: props.textValue,
      deleteTodo: props.deleteTodo,
      id: props.id,
      inCompleteTodo: props.isCompleteTodo,
      completeTodo: props.completeTodo,
      updateTodo: props.updateTodo
    }
  }

  startEditing = () => {
    const { textValue } = this.props;
    this.setState({
      isEditing: true,
    });
  };

  finishEditing = () => {
    const { todoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, todoValue);
    this.setState({
      isEditing: false
    });
  };

    controlInput = textValue => {
        this.setState({ todoValue: textValue });
      };


      toggleItem = () => {
        const { isCompleted, inCompleteTodo, completeTodo, id } = this.props;
        if (isCompleted) {
          inCompleteTodo(id);
        } else {
          completeTodo(id);
        }
      };

  render() {
    const { isEditing, todoValue } = this.state;
    const { textValue, id, deleteTodo, isCompleted } = this.props;

        return (
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={this.toggleItem}>
                  <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}>
                  </View>
                </TouchableOpacity>
                {isEditing ? (
                  <TextInput
                    value={this.state.todoValue}
                    autoFocus
                    style={[
                      styles.text,
                      styles.input,
                      isCompleted ? styles.strikeText : styles.unstrikeText
                    ]}
                    multiline={true}
                    returnKeyType={'done'}
                    onBlur={this.finishEditing}
                    onChangeText={this.controlInput}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.text,
                        isCompleted ? styles.strikeText : styles.unstrikeText
                      ]}
                      >
                      {this.state.todoValue}
                  </Text>
                )
              }
            </View>
            {isEditing ? (
              <View style={styles.buttons}>
              <TouchableOpacity onPressOut={this.finishEditing}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>✅</Text>
                </View>
              </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttons}>
              <TouchableOpacity onPressOut={this.startEditing}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>✏</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => deleteTodo(id)}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>❌</Text>
                </View>
              </TouchableOpacity>
              </View>
            )}
          </View>
        )
      };
}


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completeCircle: {
    borderColor: '#bbb'
  },
  incompleteCircle: {
    borderColor: '#2e78b7'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignSelf: 'flex-end'
},
strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through'
  },
  unstrikeText: {
    color: "#29323c"
  }
});

export default TodoList;
