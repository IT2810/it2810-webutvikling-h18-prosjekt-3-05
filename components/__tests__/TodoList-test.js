import React from 'react';
import TodoList from '../TodoList';
import renderer from 'react-test-renderer';

it('should render corrrectly', () => {
  const component = renderer.create(<TodoList id={1} />)
  const tree = renderer.create(<TodoList id={1} />).toJSON();
  expect (tree).toMatchSnapshot();
})

it('should set isEditing to true when startEditing is called', () => {
  const component = renderer.create(<TodoList id={1}/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state
  const mockSetState = jest.fn()
  instance.setState = mockSetState;
  instance.startEditing()
  expect(mockSetState).toHaveBeenCalled()
})

it('should call updateTodo and set isEditing to false when finishEditing is called', () => {
  const fakeUpdate = jest.fn() //Mocks the updateTodo function
  const component = renderer.create(<TodoList id={1} updateTodo={fakeUpdate}/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state

  instance.finishEditing()
  expect(fakeUpdate).toHaveBeenCalled()
  expect(instance.state.isEditing).toBe(false)
})

it('should call completeTodo-function in TodosScreen, when the item is toggled when isCompleted is false ', () => {
  const fakeComplete = jest.fn() //Mocks the completeTodo function
  const component = renderer.create(<TodoList id={1} isCompleted={false} completeTodo={fakeComplete}/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state

  instance.toggleItem()
  expect(fakeComplete).toHaveBeenCalled()
})

it('should call inCompleteTodo-function in TodosScreen, when the item is toggled when isCompleted is true', () => {
  const fakeinComplete = jest.fn() //Mocks the inCompleteTodo function
  const component = renderer.create(<TodoList id={1} isCompleted={true} inCompleteTodo={fakeinComplete}/>)
  const instance = component.root.instance
  const props = component.root.props
  const state = instance.state

  instance.toggleItem()
  expect(fakeinComplete).toHaveBeenCalled()
})
