jest.unmock('../bindCommands');

import bindCommands from '../bindCommands';
import mockComponent from '../../__mocks__/component';
import {pick} from 'ramda';

const pickState = pick(['history', 'visibles']);

describe('bindCommands()', () => {
  it('should bind commands to "this" and update the state', () => {
    const component = mockComponent();
    const mockCommands = {
      ls: args => args,
      lmao: args => args,
    };

    const finalCommands = bindCommands(mockCommands, component);

    finalCommands.ls('ls -l');
    finalCommands.lmao('lmao');

    expect(pickState(component.state)).toEqual({
      history: ['ls -l', 'lmao'],
      visibles: [
        {
          command: 'ls -l',
          currentPath: [],
          outputs: ['ls -l'],
        },
        {
          command: 'lmao',
          currentPath: [],
          outputs: ['lmao'],
        },
      ],
    });
  });

  it('does not update the state if the function returns undefined', () => {
    const component = mockComponent();
    const mockCommands = {
      clear: () => {},
    };

    const finalCommands = bindCommands(mockCommands, component);
    finalCommands.clear('clear');

    expect(pickState(component.state)).toEqual({
      history: ['clear'],
      visibles: [{
        command: 'clear',
        currentPath: [],
        outputs: [],
      }],
    });
  });

  it('handles promises', done => {
    const component = mockComponent();
    const mockCommands = {
      wait: () => new Promise(resolve => {
        resolve('yo');
        done();
      }),
    };

    const finalCommands = bindCommands(mockCommands, component);
    finalCommands.wait('wait');

    expect(pickState(component.state)).toEqual({
      history: ['wait'],
      visibles: [{
        command: 'wait',
        currentPath: [],
        outputs: ['yo'],
      }],
    });
  });
});
