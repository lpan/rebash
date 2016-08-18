import React, {PropTypes} from 'react';
import Command from './Command';
import {visiblePropTypes} from '../utils/customPropTypes';
import {map, addIndex} from 'ramda';

const styles = {
  container: {
    height: '400px',
    width: '400px',
    backgroundColor: 'black',
    color: 'white',
  },
};

const renderOldCommands = addIndex(map)((visible, i) => (
  <Command key={i} visible={visible} />
));

const onClickFocus = evt => {
  evt.currentTarget.lastChild.firstChild.lastChild.focus();
};

const Wrapper = ({visibles}) => (
  <div
    style={styles.container}
    onClick={onClickFocus}
  >
    {renderOldCommands(visibles)}
    <Command
      key={visibles.length}
    />
  </div>
);

Wrapper.propTypes = {
  visibles: PropTypes.arrayOf(visiblePropTypes).isRequired,
  directories: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  files: PropTypes.objectOf(PropTypes.string).isRequired,
  currentPath: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Wrapper;
