jest.unmock('../bindCommands');

import bindCommands from '../bindCommands';
import {toPairs, forEach, compose} from 'ramda';

const mockComponent = () => ({
  state: {
    visibles: [],
    history: [],
  },
  setState(obj) {
    const setThis = compose(
      forEach(pair => { this.state[pair[0]] = pair[1]; }),
      toPairs
    );
    setThis(obj);
  },
});

describe('bindCommands()', () => {
  it('should bind commands to "this" and update the state', () => {
    const component = mockComponent();
    const mockCommands = {
      ls: (self, args) => `ls: ${args}`,
      lmao: (self, args) => `lmao: ${args}`,
    };

    const finalCommands = bindCommands(mockCommands, component);

    compose(
      forEach(command => { command[1](['a', 'b']); }),
      toPairs
    )(finalCommands);

    expect(component.state).toEqual({
      history: ['ls', 'lmao'],
      visibles: [
        ['ls', 'ls: a,b'],
        ['lmao', 'lmao: a,b'],
      ],
    });
  });

  it('does not update the state if the function returns undefined', () => {
    const component = mockComponent();
    const mockCommands = {
      clear: () => {},
    };

    const finalCommands = bindCommands(mockCommands, component);

    compose(
      forEach(command => { command[1](['a', 'b']); }),
      toPairs
    )(finalCommands);

    expect(component.state).toEqual({
      history: ['clear'],
      visibles: [],
    });
  });
});
