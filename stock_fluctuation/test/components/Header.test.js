import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../client/components/header/Header.jsx';
jest.mock('../../client/components/header/Header.jsx');

describe('<Header />', () => {
  test('it should render a <div />', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should contain 3 spans', () => {
    const wrapper = shallow(<Header />);
    const spans = wrapper.find('span');
    expect(spans.length).toBe(0);
  });
});
