jest.unmock('../ls');

import ls from '../ls';
import mockComponent from '../../__mocks__/component';
import {map} from 'ramda';
import {highlightedOutput, output as normalOutput} from '../../styles';

const mapToName = map(output => output.props.children);
const mapToStyle = map(output => output.props.style);

describe('ls', () => {
  it('should show the directories properly', () => {
    const current = ['home', 'mr-goose'];
    const fs = {
      directories: [
        ['home'],
        ['home', 'lawrence'],
        ['home', 'mr-goose'],
        ['home', 'mr-goose', 'secrets'],
      ],
      files: [
        ['home', 'mr-goose', 'dank.php'],
      ],
    };

    const component = mockComponent(current, fs);
    const output = ls(component);

    expect(mapToName(output)).toEqual([
      'dank.php',
      'secrets',
    ]);

    expect(mapToStyle(output)).toEqual([
      normalOutput,
      highlightedOutput,
    ]);
  });

  it('should sort the output by alphetical order', () => {
    const current = ['home', 'mr-goose'];
    const fs = {
      directories: [
        ['home'],
        ['home', 'mr-goose'],
        ['home', 'mr-goose', 'dank'],
      ],
      files: [
        ['home', 'mr-goose', 'bank.cpp'],
        ['home', 'mr-goose', 'cank.bf'],
        ['home', 'mr-goose', 'eank.php'],
      ],
    };

    const component = mockComponent(current, fs);
    const output = ls(component);

    expect(mapToName(output)).toEqual([
      'bank.cpp',
      'cank.bf',
      'dank',
      'eank.php',
    ]);

    expect(mapToStyle(output)).toEqual([
      normalOutput,
      normalOutput,
      highlightedOutput,
      normalOutput,
    ]);
  });

  it('should work when current is root', () => {
    // root current is represented as an empty array
    const current = [];
    const fs = {
      directories: [
        ['home'],
        ['home', 'mr-goose'],
        ['etc'],
        ['etc', 'nginx'],
        ['zzz'],
      ],
      files: [
        ['virus.py'],
      ],
    };

    const component = mockComponent(current, fs);
    const output = ls(component);

    expect(mapToName(output)).toEqual([
      'etc',
      'home',
      'virus.py',
      'zzz',
    ]);

    expect(mapToStyle(output)).toEqual([
      highlightedOutput,
      highlightedOutput,
      normalOutput,
      highlightedOutput,
    ]);
  });
});
