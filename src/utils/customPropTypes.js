import {PropTypes} from 'react';

export const visiblePropTypes = PropTypes.shape({
  command: PropTypes.string,
  output: PropTypes.arrayOf(PropTypes.string),
});
