import splitPath from './splitPath';
import {
  init, map, keys, compose, uniq, concat, append, chain, reduce, last,
} from 'ramda';

// [] represents root dir
const appendRoot = append([]);

// If it is a file, we get rid of the filename to get dir path
const splitFilePath = compose(init, splitPath);

// convert dir strings to arrays
const mapToPath = map(splitPath);

// mapToPath for fileDB
const mapFileDir = compose(map(splitFilePath), keys);

// add the parent dirs of the mapped dirs to the list
const addParentDirs = chain(dir =>
  reduce((accum, current) =>
    append(append(current, last(accum)), accum), [], dir)
);

// get file paths
const getFiles = compose(uniq, mapToPath, keys);

const getDirs = compose(uniq, appendRoot, addParentDirs, uniq, concat);

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
  const files = getFiles(filesDB);
  const directories = getDirs(mapToPath(dirList), mapFileDir(filesDB));

  return {files, directories};
};

export default initFileSystem;
