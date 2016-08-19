import React from 'react';
import {output, highlightedOutput} from '../styles';
import {
  slice, map, filter, compose, addIndex, equals, allPass, last, concat, sortBy,
  path,
} from 'ramda';

// map files/dirs to virtual dom nodes
const mapOutput = style => addIndex(map)((file, i) =>
  <span key={i} style={style}>
    {file}
  </span>
);

const hasSameRoot = (currentPath, file) => equals(
  slice(0, currentPath.length, file),
  currentPath
);

const isChildren = (currentPath, file) => equals(
  file.length,
  currentPath.length + 1
);

// sort final span tags by alphabetical order
const sortByName = sortBy(path(['props', 'children']));

const sortAndConcat = compose(sortByName, concat);

const ls = self => {
  const {currentPath, fileSystem} = self.state;
  const {directories, files} = fileSystem;

  const getFiles = compose(
    map(last),
    filter(file => allPass([isChildren, hasSameRoot])(currentPath, file))
  );

  const mapNormal = mapOutput(output);
  const mapHighlight = mapOutput(highlightedOutput);

  return sortAndConcat(
    mapNormal(getFiles(files)),
    mapHighlight(getFiles(directories))
  );
};

export default ls;
