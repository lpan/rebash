jest.unmock('../Command');

import React from 'react';
import Command from '../Command';
import {shallow} from 'enzyme';
import {merge} from 'ramda';

describe('<Command />', () => {
  function render(props) {
    const mergeDefault = merge({
      visible: {},
    });

    return shallow(
      <Command {...mergeDefault(props)} />
    );
  }
});
