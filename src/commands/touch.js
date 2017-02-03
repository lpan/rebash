import {reduce, map, apply, compose, complement} from 'ramda';
import {addFile} from '../utils/fs';
import {hasParents, doesExist} from '../utils/validations';
import handleOptions, {genExpect} from '../utils/handleOptions';
import {toPath} from '../utils/pathUtils';

const noParentError = target =>
  `touch: cannot create directory ${target}: No such file or directory`;

const existError = target => `touch: cannot touch ${target}: File exists`;

const expectParent = genExpect(hasParents, noParentError);

const expectExist = genExpect(complement(doesExist), existError);

const options = {
  handlers: {
    none: compose(apply(addFile), apply(expectParent), expectExist),
  },
  fulls: {},
};

const touch = (args, self) => {
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

export default touch;
