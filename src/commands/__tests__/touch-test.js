jest.unmock('../touch');

import touch from '../touch';
import mockComponent from '../../__mocks__/component';

describe('touch', () => {
  it('should create new file(s)', () => {
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

    expect(touch({targets: ['lol.txt']}, component)).not.toBeDefined();
    expect(component.state.fileSystem).toEqual({
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [
        ['home', 'lol.txt'],
      ],
      filesDB: {
        '/home/lol.txt': null,
      },
    });

    expect(() => { touch({targets: ['yo.txt', 'goose.txt']}, component); }).not.toThrow();
    expect(component.state.fileSystem).toEqual({
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [
        ['home', 'lol.txt'],
        ['home', 'yo.txt'],
        ['home', 'goose.txt'],
      ],
      filesDB: {
        '/home/lol.txt': null,
        '/home/yo.txt': null,
        '/home/goose.txt': null,
      },
    });
  });

  it('does not update filesystem if target already exists', () => {
    const currentPath = [];
    const fileSystem = {
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
      ],
      files: [
        ['home', 'test.txt'],
      ],
      filesDB: {
        '/home/test.txt': null,
      },
    };

    const component = mockComponent(currentPath, fileSystem);

    component.setState = jest.fn();

    expect(() => { touch({targets: ['home/test.txt']}, component); }).toThrow();
    expect(component.setState).not.toBeCalled();
  });

  it('notifies user when parent of file does not exist', () => {
    const currentPath = [];
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
    expect(() => { touch({targets: ['lmao/goose.txt']}, component); }).toThrow();

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
});
