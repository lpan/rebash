jest.unmock('../mkdir');

import mkdir from '../mkdir';
import mockComponent from '../../__mocks__/component';
import {sortFs} from '../../utils/testUtils';

describe('mkdir', () => {
  it('makes a dir', () => {
    const currentPath = ['home'];
    const fileSystem = {
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [],
      filesDB: {},
    };

    const component = mockComponent(currentPath, fileSystem);

    expect(mkdir({flags: [], fulls: [], targets: ['lawrence']}, component)).not.toBeDefined();
    expect(sortFs(component.state.fileSystem)).toEqual({
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
        ['home', 'lawrence'],
      ],
      files: [],
      filesDB: {},
    });
  });

  it('notifies user when parents do not exist and -p is NOT supplied', () => {
    const currentPath = ['home'];
    const fileSystem = {
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [],
      filesDB: {},
    };

    const component = mockComponent(currentPath, fileSystem);

    expect(() => { mkdir({flags: [], fulls: [], targets: ['lawrence/memes']}, component); }).toThrow();
    expect(component.state.fileSystem).toEqual({
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [],
      filesDB: {},
    });
  });

  it('creates parent dirs when -p is supplied', () => {
    const currentPath = ['home'];
    const fileSystem = {
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [],
      filesDB: {},
    };

    const component = mockComponent(currentPath, fileSystem);

    expect(() => { mkdir({flags: ['p'], fulls: [], targets: ['lawrence/memes']}, component); }).not.toThrow();
    expect(sortFs(component.state.fileSystem)).toEqual({
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
        ['home', 'lawrence'],
        ['home', 'lawrence', 'memes'],
      ],
      files: [],
      filesDB: {},
    });
  });
});
