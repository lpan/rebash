import React, {PropTypes} from 'react';
import {visibleType, commandsType} from '../utils/customPropTypes';
import {
  compose, keys, contains, split, map, addIndex, cond, T, isNil, complement, always,
  head,
} from 'ramda';

const isDefined = complement(isNil);

// extract {outputs}, returns [] if visible not defined
const getOutputs = cond([
  [isDefined, visible => visible.outputs],
  [T, always([])],
]);

const mapOutputs = addIndex(map)((output, i) =>
  <div key={i}>
    {output}
  </div>
);

const renderOutputs = compose(mapOutputs, getOutputs);

const getCommand = compose(head, split(' '));

const onEnter = commands => evt => {
  if (evt.key === 'Enter') {
    const commandEntered = evt.target.value;
    const commandName = getCommand(commandEntered);

    if (contains(commandName, keys(commands))) {
      commands[commandName](commandEntered);
    }
  }
};

// if undefined currentPath implies it is an disabled input, we use visible
// instead
const getCurrentPath = (currentPath, visible) =>
  currentPath || visible.currentPath;

const joinPath = path => path.join('/');

const renderPrompt = compose(joinPath, getCurrentPath);

const Command = ({visible, currentPath}, {commands}) => (
  <div>
    <div>
      <div>
        {renderPrompt(currentPath, visible)}
      </div>
      <input
        value={visible && visible.command}
        disabled={visible}
        onKeyPress={onEnter(commands)}
        autoComplete={false}
        autoFocus
      />
    </div>
    {renderOutputs(visible)}
  </div>
);

Command.propTypes = {
  visible: visibleType,
  currentPath: PropTypes.arrayOf(PropTypes.string),
};

Command.contextTypes = {
  commands: commandsType,
};

export default Command;
