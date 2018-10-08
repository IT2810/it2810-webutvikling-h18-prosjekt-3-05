import React from 'react';
import {AppLoading} from 'expo';
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


// wrapper component for TodosContainer
export default class TodosScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      dataIsReady: false,
      newTodoItem: "",
      todos: {}
    }
  };


componentDidMount = () => {
  this.loadTodos();
};


componentDidMount = () => {
  this.loadTodos();
};



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
        <Text style={styles.appTitle}>Todos</Text>
        <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={'+ Add todo'}
          value={this.state.newTodoItem}
          onChangeText={this.newTodoItemController}
          placeholderTextColor={'#999'}
          returnKeyType={'done'}
          autoCorrect={false}
          onSubmitEditing={this.addTodo}
        />
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
