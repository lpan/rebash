import React, {Component, PropTypes} from 'react';
import {merge, pick} from 'ramda';
import Wrapper from './components/Wrapper';
import {initFileSystem} from './utils/fs';
import bindCommands from './utils/bindCommands';
import defaultCommands from './commands';
import {commandsType} from './utils/customPropTypes';

const mergeDefault = merge(defaultCommands);

// props we want to pass to wrapper from this.state
const pickProps = pick(['visibles', 'currentPath']);

class Terminal extends Component {
  constructor(props) {
    super(props);

    const {initialPath, directories, files, username} = props;
    const homePath = username === 'root' ? [username] : ['home', username];

    this.state = {
      username,
      // A list of commands <String> can be access with up-arrow
      history: [],
      // An ordered list of {command: '', outputs: []} visible on to the user
      visibles: [],
      // {directories: [], files: []}
      fileSystem: initFileSystem(directories, files, homePath),
      // an array representation of current path
      currentPath: initialPath,
      homePath,
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
  username: 'root',
  initialPath: [],
  files: {},
  directories: [],
};

export default Terminal;
