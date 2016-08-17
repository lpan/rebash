import {PropTypes} from 'react';

export const visiblePropTypes = PropTypes.shapeOf({
  command: PropTypes.string,
  output: PropTypes.arrayOf(PropTypes.string),
});
