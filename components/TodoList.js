import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      Dimensions,
      TextInput } from 'react-native';
import  Icon  from 'react-native-vector-icons/Entypo'

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

/*** Lets the user edit the todoItem.
This is triggered when the pencil-icon is clicked. ***/
  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

/*** Triggered when the checked-icon is clicked.
Triggeres the updateTodo-function in TodoScreen. ***/
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

/*** Lets the user check list-items of as "completed" ***/
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
          {/*** TodoList items with (un)checked circles
          Circle (show a different design depending on whether the Todo-item is completed or not) ***/}
            <TouchableOpacity onPress={this.toggleItem}>
              <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}>
              </View>
            </TouchableOpacity>
            {/*** If the pencil-icon is clicked,the isEditing is true,
            and the text-field turns into an input field. ***/}
            {isEditing ? (
              <TextInput
                value={this.state.todoValue}
                autoFocus
                maxLength={20}
                maxLine={1}
                style={[
                  styles.text,
                  styles.input,
                  isCompleted ? styles.strikeText : styles.unstrikeText
                ]}
                multiline={true}
                returnKeyType={'done'}
                onSubmitEditing={this.finishEditing}
                onChangeText={this.controlInput}
                />
              ) : (
                /*** If isEditing is not true, the field is a normal text-field displaying the todoItem ***/
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

        {/*** Options for editing and deleting todoItems
        If the todoItem is being edited, a check-icon will appear
        for the user to click on when editing is finished.
        This triggeres the finishedEditing-function ***/}
        {isEditing ? (
          <View style={styles.buttons}>
          <TouchableOpacity onPressOut={this.finishEditing}>
            <View style={styles.buttonContainer}>
              <Icon name="check" style={styles.finishedText} > </Icon>
            </View>
          </TouchableOpacity>
          </View>
        ) : (
          /*** If the user is not editing anything, he will see a pencil and an x icon,
          each triggering a different function ***/
          <View style={styles.buttons}>
          <TouchableOpacity onPressOut={this.startEditing}>
            <View style={styles.buttonContainer}>
              <Icon name="edit" style={styles.editText} > </Icon>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => deleteTodo(id)}>
            <View style={styles.buttonContainer}>
              <Icon name="cross" style={styles.deleteText} > </Icon>
            </View>
          </TouchableOpacity>
          </View>
        )}
      </View>
    )
  };
}

/*** Styling ***/
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
    marginRight: 20,
    marginLeft: 10
  },
  completeCircle: {
    borderColor: '#bbb'
  },
  incompleteCircle: {
    borderColor: '#6200ee'
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
finishedText: {
  color: '#33ff33',
  fontSize: 25
},
editText: {
  color: '#ff9900',
  fontSize: 20
},
deleteText: {
  color: 'red',
  fontSize: 25
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
