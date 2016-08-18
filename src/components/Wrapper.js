import React, {Component, PropTypes} from 'react';
import Command from './Command';
import {visiblePropTypes} from '../utils/customPropTypes';
import {map, addIndex} from 'ramda';
import styles from './style';

const renderOldCommands = addIndex(map)((visible, i) => (
  <Command key={i} visible={visible} />
));

class Wrapper extends Component {
  constructor() {
    super();
    this.onClickFocus = this.onClickFocus.bind(this);
  }

  onClickFocus() {
    this.input.focus();
  }

  render() {
    const {visibles} = this.props;

    return (
      <div
        className={styles.container}
        onClick={this.onClickFocus}
      >
        {renderOldCommands(visibles)}
        <Command
          ref={ref => { this.input = ref; }}
          key={visibles.length}
        />
      </div>
    );
  }
}

Wrapper.propTypes = {
  visibles: PropTypes.arrayOf(visiblePropTypes).isRequired,
  directories: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  files: PropTypes.objectOf(PropTypes.string).isRequired,
  currentPath: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Wrapper;
