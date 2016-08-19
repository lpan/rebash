import React from 'react';
import {visibleType, commandsType} from '../utils/customPropTypes';
import {
  compose, keys, contains, split, map, addIndex, cond, T, isNil, complement, always,
} from 'ramda';

// extract {outputs}, returns [] if visible not defined
const getOutputs = cond([
  [complement(isNil), visible => visible.outputs],
  [T, always([])],
]);

const mapOutputs = addIndex(map)((output, i) =>
  <div key={i}>
    {output}
  </div>
);

const renderOutputs = compose(mapOutputs, getOutputs);

const splitCommand = split(' ');

const onEnter = commands => evt => {
  if (evt.key === 'Enter') {
    const commandEntered = splitCommand(evt.target.value);
    const [command, ...args] = commandEntered;

    if (contains(command, keys(commands))) {
      commands[command](args);
    }
  }
};

const Command = ({visible}, {commands}) => (
  <div>
    <div>
      <div>prompt</div>
      <input
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
};

Command.contextTypes = {
  commands: commandsType,
};

export default Command;
