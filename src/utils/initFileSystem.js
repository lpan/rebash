import {
  split, isEmpty, complement, filter, init, map, keys, compose, uniq, concat,
} from 'ramda';

const filterEmpty = filter(complement(isEmpty));

// split a path string
const splitPath = compose(filterEmpty, split('/'));

// If it is a file, we get rid of the filename to get dir path
const splitFilePath = compose(init, splitPath);

// convert dir strings to arrays
const mapToPath = map(splitPath);

// mapToPath for fileDB
const mapFileDir = compose(map(splitFilePath), keys);

// get file paths
const mapFilePath = compose(mapToPath, keys);

/**
 * Create a list that contains the absolute paths of all the dirs in the
 * "file system"
 *
 * @param {[String]} directories - list of directories
 * @param {obj} filesDB - file content mapped to filename
 *
 * @returns {files: [[String]], directories: [[String]]}
 */
const initFileSystem = (dirList, filesDB) => {
  const files = mapFilePath(filesDB);
  const directories = uniq(
    concat(mapToPath(dirList), mapFileDir(filesDB))
  );

  return {files, directories};
};

export default initFileSystem;
