import {reduce, map, forEach} from 'ramda';
import {addFile} from '../utils/fs';
import {hasParents, doesExist} from '../utils/validations';
import {joinPath, toPath} from '../utils/pathUtils';

const touch = (args, self) => {
  const {fileSystem, currentPath} = self.state;
  const {targets} = args;

  const mapToPath = map(toPath(currentPath));

  const paths = mapToPath(targets);

  forEach((path) => {
    if (!hasParents(path, fileSystem)) {
      throw new Error(`touch: cannot touch '${joinPath(path)}': No such file or directory`);
    }

    // if path already exists in fs, we exit.
    if (doesExist(path, fileSystem)) {
      throw new Error();
    }
  }, paths);

  const newFs = reduce(
    (accum, current) => addFile(current, accum),
    fileSystem,
    paths
  );

  self.setState({fileSystem: newFs});
};

export default touch;
