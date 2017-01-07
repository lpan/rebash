import {apply, reduce, compose, map} from 'ramda';
import handleOptions from '../utils/handleOptions';
import {addDir} from '../utils/fs';
import {hasParents} from '../utils/validations';
import {joinPath, toPath} from '../utils/pathUtils';

const checkParent = (target, fs) => {
  if (!hasParents(target, fs)) {
    throw new Error(`mkdir: cannot create directory ${joinPath(target)}: No such file or directory`);
  }
  return [target, fs];
};

const addDirCheckParent = compose(apply(addDir), checkParent);

const options = {
  handlers: {
    none: addDirCheckParent,
    p: addDir,
  },
  fulls: {
    parent: 'p',
  },
};

const mkdir = (args, self) => {
  const {fileSystem, currentPath} = self.state;
  const {targets} = args;

  const mapToPath = map(toPath(currentPath));
  const paths = mapToPath(targets);

  const newFs = reduce(
    (accum, current) => handleOptions(options, args)(current, accum),
    fileSystem,
    paths
  );

  self.setState({fileSystem: newFs});
};

export default mkdir;
