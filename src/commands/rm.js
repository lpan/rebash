import {apply, complement, compose, map, reduce} from 'ramda';
import {hasChildren, doesExist} from '../utils/validations';
import handleOptions from '../utils/handleOptions';
import {joinPath, toPath} from '../utils/pathUtils';
import {removeFile, removeDir} from '../utils/fs';

const genExpect = (expectation, makeError) => (target, fs) => {
  if (!expectation(target, fs)) {
    throw new Error(makeError(joinPath(target)));
  }
  return [target, fs];
};

const existError = target =>
  `rm: cannot remove ${target}: No such file or directory`;

const hasChildrenError = target =>
  `rm: cannot remove ${target}: Is a directory`;

const expectExist = genExpect(doesExist, existError);

const expectNoChildren = genExpect(complement(hasChildren), hasChildrenError);

const options = {
  handlers: {
    none: compose(apply(removeFile), apply(expectNoChildren), expectExist),
    r: compose(apply(removeDir), expectExist),
  },
  fulls: {
    recursive: 'r',
  },
};

const rm = (args, self) => {
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

export default rm;
