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
  AsyncStorage } from 'react-native';

import TodoList from './../components/TodoList'

export default class TodosScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      dataIsReady: false,
      newTodoItem: "",
      todos: {}
    }
  };

//
componentDidMount = () => {
  this.loadTodos();
};

//Try loading the todos, if not the error is catched and logged.
loadTodos = async () => {
  try {
    const getTodos = await AsyncStorage.getItem('todos');
    const parsedTodos = JSON.parse(getTodos);
    this.setState({ dataIsReady: true, todos: parsedTodos || {} });
  } catch (err) {
    console.log(err);
  }
};

saveTodos = newToDos => {
  const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newToDos));
};

/*Creates a todo-item and adds it to the TodoList.
The todoItems textvalue is the the value that is currently in the inputfield.
This is triggered when the user clicks "done" on the keyboard*/
addTodo = () => {
  const { newTodoItem } = this.state;

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
  }
};

/*Deletes a todo-item and removes it from the TodoList.
This is triggered when the user clicks on the x-icon (which is found in  TodoList.js)*/
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

/*Changes the todo-item's state to incompleted and saves the new state
(this is triggered by the toggle-function in TodoList.js when the circle is pressed)*/
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

/*Changes the todo-item's state to completed and saves the new state.
This is triggered by the toggle-function in TodoList.js when the circle is pressed.
This again changes the isCompleted in TodoList.js to true*/
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

/*Updates the todoItem.
This is triggered when the user clicks on the checked-icon in TodoList.js */
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

    if (!dataIsReady) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        //Header
        <Text style={styles.appTitle}>Todos</Text>
        //Container created to look like a card
        <View style={styles.card}>
        //User input field. A new toDo is created when the user clicks on the "done"-key on the keyboard.
        <TextInput
          style={styles.input}
          placeholder={'+ Add todo'}
          maxLength={20}
          value={this.state.newTodoItem}
          onChangeText={this.newTodoItemController}
          placeholderTextColor={'#2e78b7'}
          returnKeyType={'done'}
          autoCorrect={false}
          onSubmitEditing={this.addTodo}
        />
        //The actual toDoList.
        <ScrollView contentContainerStyle={styles.listContainer}>
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
        </ScrollView>
        </View>
      </View>
    );
  }
}

//Styling. Uses Demensions.get to get the windowsize of the device being used/showing the apps content.
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
}
});
