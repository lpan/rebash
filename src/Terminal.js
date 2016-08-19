import React, {Component, PropTypes} from 'react';
import Wrapper from './components/Wrapper';
import initFileSystem from './utils/initFileSystem';
import defaultCommands from './commands';
import {commandsType} from './utils/customPropTypes';
import {merge} from 'ramda';

const mergeDefault = merge(defaultCommands);

class Terminal extends Component {
  constructor(props) {
    super(props);

    const {initialPath, directories, files} = props;
    this.state = {
      // A list of commands <String> can be access with up-arrow
      history: [],
      // An ordered list of {command: '', outputs: []} visible on to the user
      visibles: [],
      // {directories: [], files: []}
      fileSystem: initFileSystem(directories, files),
      // look up a file's content using its absolute path as key
      files,
      // an array representation of current path
      currentPath: initialPath,
    };
  }

  getChildContext() {
    const commands = mergeDefault(this.props.commands);
    return {commands};
  }

  render() {
    return (
      <Wrapper {...this.state} />
    );
  }
}

Terminal.childContextTypes = {
  commands: commandsType,
};

Terminal.propTypes = {
  // a list of directory paths
  directories: PropTypes.arrayOf(PropTypes.string),
  // file content mapped to file absolute path
  files: PropTypes.objectOf(PropTypes.string),
  initialPath: PropTypes.arrayOf(PropTypes.string),
  commands: commandsType,
};

Terminal.defaultProps = {
  initialPath: ['/'],
  files: {},
  directories: [],
};

export default Terminal;
