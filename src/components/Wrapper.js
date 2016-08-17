import React, {PropTypes} from 'react';
import {visiblePropTypes} from '../utils/customPropTypes';

function Wrapper() {
  return (
    <div>Hello</div>
  );
}

Wrapper.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.string).isRequired,
  visibles: PropTypes.arrayOf(visiblePropTypes).isRequired,
  directories: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  files: PropTypes.objectOf(PropTypes.string).isRequired,
  currentPath: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Wrapper;
