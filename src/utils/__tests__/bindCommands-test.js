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

const mockCommands = {
  ls: command => `command is ${command}`,
  clear: command => `command is ${command}`,
};

describe('bindCommands()', () => {
  it('should bind commands to "this" and update the state', () => {
    const component = mockComponent();
    const finalCommands = bindCommands(mockCommands, component);

    compose(
      forEach(command => { command[1](command[0]); }),
      toPairs
    )(finalCommands);

    expect(component.state).toEqual({
      history: ['ls', 'clear'],
      visibles: [
        ['ls', 'command is ls'],
        ['clear', 'command is clear'],
      ],
    });
  });
});
