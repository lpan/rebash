import React from 'react';
import {output, highlightedOutput} from '../styles';
import findFilters from '../utils/findFilters';
import {
  map, filter, compose, addIndex, equals, last, concat, sortBy,
  path, init, identity, complement, head,
} from 'ramda';

const notEquals = complement(equals);

// map files/dirs to virtual dom nodes
const mapOutput = style => addIndex(map)((file, i) =>
  <span key={i} style={style}>
    {file}
  </span>
);

// sort final span tags by alphabetical order
const sortByName = sortBy(path(['props', 'children']));

const getChildren = path(['props', 'children']);

/*
 * Option filters
 */

// Not show files/dirs starting with a '.'
const filterHidden = filter(compose(notEquals('.'), head, getChildren));

// TODO: actually prints detailed outputs
const formatDetail = identity;

const options = {
  flags: {
    none: filterHidden,
    a: identity,
    l: compose(formatDetail, filterHidden),
    al: formatDetail,
  },
  options: {
  },
};

const ls = (args, self) => {
  const {currentPath, fileSystem} = self.state;
  const {directories, files} = fileSystem;

  const getFiles = compose(
    map(last),
    filter(file => equals(currentPath, init(file)))
  );

  const mapFiles = mapOutput(output);
  const mapDirs = mapOutput(highlightedOutput);

  return (
    <div>
      {compose(sortByName, findFilters(options, args), concat)(
        mapFiles(getFiles(files)),
        mapDirs(getFiles(directories))
      )}
    </div>
  );
};

export default ls;
