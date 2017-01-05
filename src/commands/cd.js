import splitPath from '../utils/splitPath';
import {isAbsolutePath} from '../utils/validations';
import {
  always, equals, cond, init, T, flip, append, contains, head,
} from 'ramda';

const getPath = (currentPath, homePath) => cond([
  [equals('~'), always(homePath)],
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
  const target = head(args.targets) || '~';
  const {currentPath, homePath, fileSystem} = self.state;

  const newPath = getPath(currentPath, homePath)(target);

  // TODO better error handling
  if (!contains(newPath, fileSystem.directories)) {
    return `cd: no such file or directory: ${target}`;
  }

  self.setState({currentPath: newPath});
};

export default cd;
