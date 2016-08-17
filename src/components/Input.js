import React, {PropTypes} from 'react';
import {visiblePropTypes} from '../utils/customPropTypes';

const Input = () => (
);

Input.propTypes = {
  commands: PropTypes.objectOf(PropTypes.func),
  currentPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.string,
  visible: visiblePropTypes,
};

export default Input;
