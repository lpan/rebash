import React, {Component, PropTypes} from 'react';
import initDirs from './utils/initDirs';

class Terminal extends Component {
  constructor(props) {
    super(props);

    const {initialPath, directories, files} = props;
    this.state = {
      // A list of commands <String> can be access with up-arrow
      history: [],
      // An ordered list of {command: '', outputs: []} visible on to the user
      visibles: [],
      // A list of directories and files
      directories: initDirs(directories, files),
      // look up a file's content using its absolute path as key
      files,
      // an array representation of current path
      currentPath: initialPath,
    };
  }

  render() {
    return (
      <div>{JSON.stringify(this.state.directories)}</div>
    );
  }
}

Terminal.propTypes = {
  // a list of directory paths
  directories: PropTypes.arrayOf(PropTypes.string),
  // file content mapped to file absolute path
  files: PropTypes.objectOf(PropTypes.string),
  initialPath: PropTypes.arrayOf(PropTypes.string),
  commands: PropTypes.objectOf(PropTypes.func),
};

Terminal.defaultProps = {
  initialPath: ['/'],
  files: {},
  directories: [],
};

export default Terminal;
