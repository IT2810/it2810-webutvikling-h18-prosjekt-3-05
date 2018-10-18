import React from 'react';
import { AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  AsyncStorage,
  Alert,
 } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TodoList from './../components/TodoList';

export default class TodosScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataIsReady: false,
      newTodoItem: '',
      todos: {}
    }
  };

componentDidMount = () => {
  this.loadTodos();
};

/*** Getteing the name of choosen Goal(which was selected from the HomeScreen) ***/
getGoalName = () => {
  const navigation = this.props;
  return s = JSON.stringify(this.props.navigation.state.params.goal_name);
}

/*** Loading todos related to the selected Goal ***/
loadTodos = async () => {
  let key = this.getGoalName();
  const getTodos = await AsyncStorage.getItem(key);
  const parsedTodos = JSON.parse(getTodos);
  this.setState({ dataIsReady: true, todos: parsedTodos || {} });
};

saveTodos = async (newToDos) => {
  let key = this.getGoalName();
  await AsyncStorage.setItem(key, JSON.stringify(newToDos));
};


/*** Creates a todo-item and adds it to the TodoList.
The todo-Items textvalue is the the value that is currently in the inputfield.
This is triggered when the user clicks "done" on the keyboard ***/
addTodo = (newTodoItem) => {
  if (newTodoItem !== '') {
    this.setState(prevState => {
      const ID = uuidv1();
      const newToDoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          textValue: newTodoItem,
          createdAt: Date.now()
        }
      };
      //Clears the inputfield
      const newState = {
        ...prevState,
        newTodoItem: '',
        todos: {
          ...prevState.todos,
          ...newToDoObject
        }
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  } else {
      Alert.alert(
        'Something went wrong :(',
        'This field cannot be empty',
        {cancalable: false}
      )
  }
};

/*** Deletes a todo-item and removes it from the TodoList.
This is triggered when the user clicks on the x-icon (which is found in TodoList.js) ***/
deleteTodo = id => {
  this.setState(prevState => {
    const todos = prevState.todos;
    delete todos[id];
    const newState = {
      ...prevState,
      ...todos
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};

/*** Changes the todo-item's state to incompleted and saves the new state
(this is triggered by the toggle-function in TodoList.js when the circle is pressed) ***/
inCompleteTodo = id => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      todos: {
        ...prevState.todos,
        [id]: {
          ...prevState.todos[id],
          isCompleted: false
        }
      }
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};

/*** Changes the todo-item's state to completed and saves the new state.
This is triggered by the toggle-function in TodoList.js when the circle is pressed.
This again changes the isCompleted in TodoList.js to true ***/
completeTodo = id => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      todos: {
        ...prevState.todos,
        [id]: {
          ...prevState.todos[id],
          isCompleted: true
        }
      }
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};

/*** Updates the todoItem.
This is triggered when the user clicks on the checked-icon in TodoList.js ***/
updateTodo = (id, textValue) => {
  this.setState(prevState => {
    const newState = {
      ...prevState,
      todos: {
        ...prevState.todos,
        [id]: {
          ...prevState.todos[id],
          textValue: textValue
        }
      }
    };
    this.saveTodos(newState.todos);
    return { ...newState };
  });
};

newTodoItemController = textValue => {
    this.setState({
      newTodoItem: textValue
    });
};

  render() {
    const { newTodoItem, dataIsReady, todos } = this.state;
    const s = this.getGoalName();
    const goal = s.replace(/['"]+/g, '');

    if (!dataIsReady) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        { /* Header */ }
        <Text style={styles.appTitle}> {goal} </Text>
        { /* Container created to look like a card */}
        <View style={styles.card}>
          { /* User input field. A new toDo is created when the user clicks on the "done"-key on the keyboard. */ }
          <TextInput
            style={styles.input}
            placeholder={'+ Add todo'}
            maxLength={20}
            value={this.state.newTodoItem}
            onChangeText={this.newTodoItemController}
            placeholderTextColor={'#2e78b7'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={() => this.addTodo(this.state.newTodoItem)}
          />

          <KeyboardAwareScrollView viewIsInsideTabBar>
            <View>
            {Object.values(todos).map(todo =>
              <TodoList
                  key={todo.id}
                  {...todo}
                  deleteTodo={this.deleteTodo}
                  inCompleteTodo={this.inCompleteTodo}
                  completeTodo={this.completeTodo}
                  updateTodo={this.updateTodo}
                />
              )}
              </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}


/*** Styling.
Use Demensions.get to get the windowsize of the device being used/showing the apps content. ***/
const { heigh, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01194f',
    alignItems: 'center',
  },
  appTitle: {
    color: '#2e78b7',
    fontSize: 36,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '300'
},
card: {
    backgroundColor: '#f5f5f0',
    flex: 1,
    width: width-30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24
  },
  listContainer: {
    alignItems: 'center'
},
  cancel: {
    backgroundColor: '#FF0000',
  }
});
