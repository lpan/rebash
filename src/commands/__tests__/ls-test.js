jest.unmock('../ls');

import ls from '../ls';
import mockComponent from '../../__mocks__/component';
import {map, path, compose} from 'ramda';
import {highlightedOutput, output as normalOutput} from '../../styles';

const getChildren = path(['props', 'children']);

const mapToName = compose(map(getChildren), getChildren);
const mapToStyle = compose(map(path(['props', 'style'])), getChildren);

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
    const output = ls({fulls: [], flags: []}, component);

    expect(mapToName(output)).toEqual([
      'secrets',
      'dank.php',
    ]);

    expect(mapToStyle(output)).toEqual([
      highlightedOutput,
      normalOutput,
    ]);
  });

  it('should sort the output by alphetical order', () => {
    const current = ['home', 'mr-goose'];
    const fs = {
      directories: [
        ['home'],
        ['.config'],
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
    const output = ls({fulls: [], flags: []}, component);

    expect(mapToName(output)).toEqual([
      'dank',
      'bank.cpp',
      'cank.bf',
      'eank.php',
    ]);

    expect(mapToStyle(output)).toEqual([
      highlightedOutput,
      normalOutput,
      normalOutput,
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
        ['.config'],
        ['etc'],
        ['etc', 'nginx'],
        ['zzz'],
      ],
      files: [
        ['virus.py'],
      ],
    };

    const component = mockComponent(current, fs);
    const output = ls({fulls: [], flags: []}, component);

    expect(mapToName(output)).toEqual([
      'etc',
      'home',
      'zzz',
      'virus.py',
    ]);

    expect(mapToStyle(output)).toEqual([
      highlightedOutput,
      highlightedOutput,
      highlightedOutput,
      normalOutput,
    ]);
  });

  it('should display hidden files with -a flag', () => {
    // root current is represented as an empty array
    const current = [];
    const fs = {
      directories: [
        ['home'],
        ['home', 'mr-goose'],
        ['etc'],
        ['etc', 'nginx'],
        ['zzz'],
        ['.config'],
      ],
      files: [
        ['virus.py'],
      ],
    };

    const component = mockComponent(current, fs);
    const output = ls({fulls: [], flags: ['a']}, component);

    expect(mapToName(output)).toEqual([
      '.config',
      'etc',
      'home',
      'zzz',
      'virus.py',
    ]);

    expect(mapToStyle(output)).toEqual([
      highlightedOutput,
      highlightedOutput,
      highlightedOutput,
      highlightedOutput,
      normalOutput,
    ]);
  });
});
