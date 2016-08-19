jest.unmock('../ls');

import ls from '../ls';
import mockComponent from '../../__mocks__/component';
import {map} from 'ramda';
import {highlightedOutput} from '../../styles';

const mapToName = map(output => output.props.children);
const mapToStyle = map(output => output.props.style);

describe('ls', () => {
  it('should show the directories properly', () => {
    const current = ['home'];
    const directories = [
      ['home'],
      ['home', 'lawrence'],
      ['home', 'mr-goose'],
      ['home', 'mr-goose', 'secrets'],
    ];

    const component = mockComponent(current, directories);
    const output = ls(component);

    expect(mapToName(output)).toEqual([
      'lawrence',
      'mr-goose',
    ]);

    expect(mapToStyle(output)).toEqual([
      highlightedOutput,
      highlightedOutput,
    ]);
  });
});
