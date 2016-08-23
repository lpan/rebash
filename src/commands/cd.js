import splitPath from '../utils/splitPath';
import {
  always, equals, cond, init, T, flip, append, contains,
} from 'ramda';

// if the string is /ayy/lmao we assume its an absolute path
const isAbsolutePath = contains('/');

const getPath = currentPath => cond([
  [equals('.'), always(currentPath)],
  [equals('..'), always(init(currentPath))],
  [isAbsolutePath, splitPath],
  [T, flip(append)(currentPath)],
]);

/*
 * targets: 1
 * flags: none
 * options: none
 */
const cd = (args, self) => {
  const {targets} = args;
  const [target] = targets;
  const {currentPath, fileSystem} = self.state;

  const newPath = getPath(currentPath)(target);

  // TODO better error handling
  if (!contains(newPath, fileSystem.directories)) {
    return `cd: no such file or directory: ${target}`;
  }

  self.setState({currentPath: newPath});
};

export default cd;
