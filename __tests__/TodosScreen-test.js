import React from 'react';
import TodosScreen from '../screens/TodosScreen';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native'

//Implements mock
const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

it('should render corrrectly', async () => {
  mock();
  await storage.setItem('todos', '{}')
  const value = await storage.getItem('todos')
  const component = renderer.create(<TodosScreen />)
})

//addTodo tests
it('should change state when addTodo is called', () => {
  const component = renderer.create(<TodosScreen newTodoItem="Hei"/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.addTodo()
  expect(mockSetState).toHaveBeenCalled()
})

it('should call saveTodo when addTodo is called', () => {
  const component = renderer.create(<TodosScreen newTodoItem="Hei"/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSaveTodos = jest.fn()
  instance.saveTodos = mockSaveTodos;
  instance.addTodo()
  expect(mockSaveTodos).toHaveBeenCalled()
})


//Delete Todo Tests
it('should change state when deleteTodo is called', () => {
  const component = renderer.create(<TodosScreen newTodoItem="Hei"/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.deleteTodo()
  expect(mockSetState).toHaveBeenCalled()
})

it('should call saveTodos when deleteTodo is called', () => {
  const component = renderer.create(<TodosScreen />)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSaveTodos = jest.fn()
  instance.saveTodos = mockSaveTodos;
  instance.deleteTodo()
  expect(mockSaveTodos).toHaveBeenCalled()
})

//inCompleteTodo tests
it('should change state when inCompleteTodo is called', () => {
  const component = renderer.create(<TodosScreen/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.inCompleteTodo()
  expect(mockSetState).toHaveBeenCalled()
})

it('should call saveTodos when inCompleteTodo is called', () => {
  const component = renderer.create(<TodosScreen />)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSaveTodos = jest.fn()
  instance.saveTodos = mockSaveTodos;
  instance.inCompleteTodo()
  expect(mockSaveTodos).toHaveBeenCalled()
})

//completeTodo Tests
it('should change state when completeTodo is called', () => {
  const component = renderer.create(<TodosScreen/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.completeTodo()
  expect(mockSetState).toHaveBeenCalled()
})

it('should call saveTodos when completeTodo is called', () => {
  const component = renderer.create(<TodosScreen />)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSaveTodos = jest.fn()
  instance.saveTodos = mockSaveTodos;
  instance.completeTodo()
  expect(mockSaveTodos).toHaveBeenCalled()
})

//updateTodo tests
it('should change state when updateTodo is called', () => {
  const component = renderer.create(<TodosScreen/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.updateTodo()
  expect(mockSetState).toHaveBeenCalled()
})

it('should call saveTodos when updateTodo is called', () => {
  const component = renderer.create(<TodosScreen />)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSaveTodos = jest.fn()
  instance.saveTodos = mockSaveTodos;
  instance.updateTodo()
  expect(mockSaveTodos).toHaveBeenCalled()
})

//newTodoItemController test
it('should change state when newTodoItemController is called', () => {
  const component = renderer.create(<TodosScreen/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.newTodoItemController()
  expect(mockSetState).toHaveBeenCalled()
})
