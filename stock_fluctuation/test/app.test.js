import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/App.jsx';
jest.mock('../client/App.jsx');

describe('App', () => {
  test('should render a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render 4 children elements', () => {
    const wrapper = shallow(<App />);
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.children().length).toEqual(0);
  });
});
