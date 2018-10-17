import React from 'react';
import Pedometer from '../Pedometer';
import renderer from 'react-test-renderer';

it('should render corrrectly', () => {
  const component = renderer.create(<Pedometer />)
  const tree = renderer.create(<Pedometer />).toJSON();
  expect (tree).toMatchSnapshot();
})

/*it('should watchStepCount when _subscribe is called', () => {
  const component = renderer.create(<Pedometer />)
  const instance = component.root.instance
  const state = instance.state
  const mockSetState = jest.fn()
  instance.watchStepCount = mockSetState
  console.log(state)
  instance.componentDidMount()
  expect(mockSetState).toHaveBeenCalled()
})*/
