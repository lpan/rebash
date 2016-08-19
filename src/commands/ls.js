import React from 'react';
import {output, highlightedOutput} from '../styles';
import {
  keys, slice, map, filter, compose, addIndex, equals, allPass, last, concat,
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

const ls = self => {
  const {currentPath, directories} = self.state;
  const files = keys(self.state.files);

  const getFiles = compose(
    map(last),
    filter(file => allPass([isChildren, hasSameRoot])(currentPath, file))
  );

  return concat(
    mapOutput(output)(getFiles(files)),
    mapOutput(highlightedOutput)(getFiles(directories))
  );
};

export default ls;
