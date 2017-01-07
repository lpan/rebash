import React from 'react';
import {
  map, filter, compose, addIndex, equals, last, concat, sortBy,
  init, identity, complement, head, pick,
} from 'ramda';
import {output, highlightedOutput} from '../styles';
import handleOptions from '../utils/handleOptions';
import {filterEmpty} from '../utils/pathUtils';

const notEquals = complement(equals);

// map files/dirs to virtual dom nodes
const mapOutput = (style, key) => addIndex(map)((file, i) =>
  <span key={`${key}-${i}`} style={style}>
    {file}
  </span>);

// sort final span tags by alphabetical order
const sortByName = sortBy(identity);

/*
 * Option filters
 */

// ls without the '-a' flag
const filterHidden = filter(compose(notEquals('.'), head));

// ls with the '-l' flag
// TODO: actually prints detailed outputs
const formatDetail = identity;

const options = {
  handlers: {
    none: filterHidden,
    a: identity,
    l: compose(formatDetail, filterHidden),
    // in alphabetical order
    al: formatDetail,
  },
  fulls: {
    all: 'a',
  },
};

// get a list of files under current dir
const getFiles = currentPath => compose(
  map(last),
  filterEmpty,
  filter(file => equals(currentPath, init(file)))
);

const ls = (args, self) => {
  const {currentPath, fileSystem} = self.state;
  const {directories, files} = map(
    compose(sortByName, handleOptions(options, args), getFiles(currentPath)),
    pick(['files', 'directories'], fileSystem)
  );

  const mapFiles = mapOutput(output, 'files');
  const mapDirs = mapOutput(highlightedOutput, 'dirs');

  return (
    <div>
      {concat(
        mapDirs(directories),
        mapFiles(files)
      )}
    </div>
  );
};

export default ls;
