import React, {Component, PropTypes} from 'react';
import Wrapper from './components/Wrapper';
import {initFileSystem} from './utils/fs';
import bindCommands from './utils/bindCommands';
import defaultCommands from './commands';
import {commandsType} from './utils/customPropTypes';
import {merge, pick} from 'ramda';

const mergeDefault = merge(defaultCommands);

// props we want to pass to wrapper from this.state
const pickProps = pick(['visibles', 'currentPath']);

class Terminal extends Component {
  constructor(props) {
    super(props);

    const {initialPath, directories, files, username} = props;
    this.state = {
      // A list of commands <String> can be access with up-arrow
      history: [],
      // An ordered list of {command: '', outputs: []} visible on to the user
      visibles: [],
      // {directories: [], files: []}
      fileSystem: initFileSystem(directories, files, username),
      // look up a file's content using its absolute path as key
      files,
      // an array representation of current path
      currentPath: initialPath,
      homePath: username ? ['home', username] : [],
    };
  }

  getChildContext() {
    const commands = bindCommands(mergeDefault(this.props.commands), this);
    return {commands};
  }

  render() {
    return (
      <Wrapper {...pickProps(this.state)} />
    );
  }
}

Terminal.childContextTypes = {
  commands: commandsType,
};

Terminal.propTypes = {
  username: PropTypes.string,
  // a list of directory paths
  directories: PropTypes.arrayOf(PropTypes.string),
  // file content mapped to file absolute path
  files: PropTypes.objectOf(PropTypes.string),
  initialPath: PropTypes.arrayOf(PropTypes.string),
  commands: commandsType,
};

Terminal.defaultProps = {
  initialPath: [],
  files: {},
  directories: [],
};

export default Terminal;
