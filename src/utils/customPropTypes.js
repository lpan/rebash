import {PropTypes} from 'react';

export const visibleType = PropTypes.shape({
  command: PropTypes.string,
  output: PropTypes.arrayOf(PropTypes.string),
});

export const commandsType = PropTypes.objectOf(PropTypes.func);
