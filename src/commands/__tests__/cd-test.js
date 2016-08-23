jest.unmock('../cd');

import cd from '../cd';
import mockComponent from '../../__mocks__/component';

describe('cd', () => {
  it('should change dir properly', () => {
    const currentPath = ['home'];
    const fileSystem = {
      directories: [
        [],
        ['etc'],
        ['home'],
        ['etc', 'nginx'],
      ],
      files: [],
    };

    const component = mockComponent(currentPath, fileSystem);
    let output;

    output = cd({targets: ['..']}, component);
    expect(component.state.currentPath).toEqual([]);
    expect(output).not.toBeDefined();

    output = cd({targets: ['home']}, component);
    expect(component.state.currentPath).toEqual(['home']);
    expect(output).not.toBeDefined();

    output = cd({targets: ['.']}, component);
    expect(component.state.currentPath).toEqual(['home']);
    expect(output).not.toBeDefined();

    output = cd({targets: ['/etc/nginx']}, component);
    expect(component.state.currentPath).toEqual(['etc', 'nginx']);
    expect(output).not.toBeDefined();
  });

  it('handles path not found error', () => {
    // TODO
  });

  it('handles wrong option error', () => {
    // TODO
  });
});
