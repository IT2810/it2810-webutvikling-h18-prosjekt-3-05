import React from 'react';
import StepCounter from '../StepCounter';
import renderer from 'react-test-renderer';

it('should render corrrectly', () => {
  const tree = renderer.create(<StepCounter />).toJSON();
  expect (tree).toMatchSnapshot();
})
