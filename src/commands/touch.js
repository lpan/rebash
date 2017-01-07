import {reduce, map, flip, append, forEach, concat} from 'ramda';
import {addFile} from '../utils/fs';
import {hasParents, isAbsolutePath, hasDuplicate} from '../utils/validations';
import {splitPath, joinPath} from '../utils/pathUtils';

const touch = (args, self) => {
  const {fileSystem, currentPath} = self.state;
  const {targets} = args;

  const mapToPath = map(target =>
    isAbsolutePath(target) ? splitPath(target) : concat(currentPath, splitPath(target)));

  const paths = mapToPath(targets);

  for (let i = 0; i < paths.length; i ++) {
    if (!hasParents(paths[i], fileSystem)) {
      return `touch: cannot touch '${joinPath(paths[i])}': No such file or directory`;
    }

    if (hasDuplicate(paths[i], fileSystem)) {
      return;
    }
  }

  console.log('yo');

  const newFs = reduce(
    (accum, current) => addFile(current, accum),
    fileSystem,
    paths,
  );

  self.setState({fileSystem: newFs});
};

export default touch;
