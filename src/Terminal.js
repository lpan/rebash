import React, {Component, PropTypes} from 'react';
import {merge, pick, compose, uniq, concat} from 'ramda';
import Wrapper from './components/Wrapper';
import {initFileSystem} from './utils/fs';
import bindCommands from './utils/bindCommands';
import {commandsType} from './utils/customPropTypes';
import {splitPath} from './utils/pathUtils';
import defaultCommands from './commands';

const mergeDefault = merge(defaultCommands);

// props we want to pass to wrapper from this.state
const pickProps = pick(['visibles', 'currentPath']);

class Terminal extends Component {
  constructor(props) {
    super(props);

    const {initialPath, directories, files, username} = props;
    const homePath = username === 'root' ? `/${username}` : `/home/${username}`;
    const currentPath = splitPath(initialPath);

    const finalDirs = compose(uniq, concat(directories))([initialPath, homePath]);

    this.state = {
      username,
      // A list of commands <String> can be access with up-arrow
      history: [],
      // An ordered list of {command: '', outputs: []} visible on to the user
      visibles: [],
      // {directories: [], files: []}
      fileSystem: initFileSystem(finalDirs, files),
      // an array representation of current path
      currentPath,
      homePath: splitPath(homePath),
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
  initialPath: PropTypes.string,
  commands: commandsType,
};

Terminal.defaultProps = {
  username: 'root',
  initialPath: '/',
  files: {},
  directories: [],
};

export default Terminal;
