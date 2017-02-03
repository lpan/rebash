import {apply, compose, map, reduce} from 'ramda';
import {doesExist, isFile} from '../utils/validations';
import handleOptions, {genExpect} from '../utils/handleOptions';
import {toPath} from '../utils/pathUtils';
import {removeFile, removeDir} from '../utils/fs';

const existError = target =>
  `rm: cannot remove ${target}: No such file or directory`;

const isDirectoryError = target =>
  `rm: cannot remove ${target}: Is a directory`;

const expectExist = genExpect(doesExist, existError);

const expectFile = genExpect(isFile, isDirectoryError);

const options = {
  handlers: {
    none: compose(apply(removeFile), apply(expectFile), expectExist),
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
