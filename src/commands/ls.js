import React from 'react';
import {output, highlightedOutput} from '../styles';
import {
  map, filter, compose, addIndex, equals, last, concat, sortBy,
  path, init,
} from 'ramda';

// map files/dirs to virtual dom nodes
const mapOutput = style => addIndex(map)((file, i) =>
  <span key={i} style={style}>
    {file}
  </span>
);

// sort final span tags by alphabetical order
const sortByName = sortBy(path(['props', 'children']));

const sortAndConcat = compose(sortByName, concat);

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
      {sortAndConcat(
        mapFiles(getFiles(files)),
        mapDirs(getFiles(directories))
      )}
    </div>
  );
};

export default ls;
