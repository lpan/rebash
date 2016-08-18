jest.unmock('../Terminal');

import React from 'react';
import Terminal from '../Terminal';
import {shallow} from 'enzyme';

describe('The <Terminal /> component', () => {
  function render(props = {}) {
    return shallow(<Terminal {...props} />);
  }

  it('generates correct initial props', () => {
    const wrapper = render({
      files: {'/home/lpan/lmao.js': null},
      directories: ['/home/lpan'],
    });

    expect(wrapper.state()).toEqual({
      history: [],
      visibles: [],
      directories: [
        ['home', 'lpan'],
      ],
      files: {'/home/lpan/lmao.js': null},
      currentPath: ['/'],
    });
  });
});
