jest.unmock('../Wrapper');

import React from 'react';
import Wrapper from '../Wrapper';
import {mount} from 'enzyme';
import {merge} from 'ramda';

describe('<Wrapper />', () => {
  function render(props) {
    const mergeDefault = merge({
      visibles: [],
    });

    return mount(
      <Wrapper {...mergeDefault(props)} />
    );
  }
});
