jest.unmock('../Terminal');

import React from 'react';
import Terminal from '../Terminal';
import {shallow} from 'enzyme';

describe('The <Terminal /> component', () => {
  function render() {
    return shallow(<Terminal />);
  }

  it('should render hello world', () => {
    const wrapper = render();
    expect(wrapper.find('p').text()).toBe('Hello');
  });
});
