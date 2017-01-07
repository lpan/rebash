jest.unmock('../Terminal');

import React from 'react';
import Terminal from '../Terminal';
import {sortFs} from '../utils/testUtils';
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

    // sort file system first
    wrapper.setState({fileSystem: sortFs(wrapper.state().fileSystem)});

    expect(wrapper.state()).toEqual({
      history: [],
      visibles: [],
      username: 'root',
      fileSystem: {
        directories: [
          [],
          ['home'],
          ['home', 'lpan'],
          ['root'],
        ],
        files: [
          ['home', 'lpan', 'lmao.js'],
        ],
        filesDB: {'/home/lpan/lmao.js': null},
      },
      currentPath: [],
      homePath: ['root'],
    });
  });
});
