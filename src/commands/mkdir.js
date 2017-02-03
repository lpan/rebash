import {apply, reduce, compose, map} from 'ramda';
import handleOptions, {genExpect} from '../utils/handleOptions';
import {addDir} from '../utils/fs';
import {hasParents} from '../utils/validations';
import {toPath} from '../utils/pathUtils';

const noParentError = target =>
  `mkdir: cannot create directory ${target}: No such file or directory`;

const expectParent = genExpect(hasParents, noParentError);

const addDirCheckParent = compose(apply(addDir), expectParent);

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
