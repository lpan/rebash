jest.unmock('../bindCommands');

import bindCommands from '../bindCommands';
import mockComponent from '../../__mocks__/component';
import {pick, toPairs, forEach, compose} from 'ramda';

const pickState = pick(['history', 'visibles']);

describe('bindCommands()', () => {
  const runCommands = compose(
    forEach(command => { command[1](['a', 'b']); }),
    toPairs
  );

  it('should bind commands to "this" and update the state', () => {
    const component = mockComponent();
    const mockCommands = {
      ls: (self, args) => `ls: ${args}`,
      lmao: (self, args) => `lmao: ${args}`,
    };

    const finalCommands = bindCommands(mockCommands, component);
    runCommands(finalCommands);

    expect(pickState(component.state)).toEqual({
      history: ['ls', 'lmao'],
      visibles: [
        {
          command: 'ls',
          outputs: ['ls: a,b'],
        },
        {
          command: 'lmao',
          outputs: ['lmao: a,b'],
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
    runCommands(finalCommands);

    expect(pickState(component.state)).toEqual({
      history: ['clear'],
      visibles: [{
        command: 'clear',
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
    runCommands(finalCommands);

    expect(pickState(component.state)).toEqual({
      history: ['wait'],
      visibles: [{
        command: 'wait',
        outputs: ['yo'],
      }],
    });
  });
});
