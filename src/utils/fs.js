import {
  init, map, keys, compose, uniq, concat, append, chain, reduce, last,
  filter, flip, contains, complement, equals, slice, length, evolve,
  head, toPairs, fromPairs, assoc, dissoc,
} from 'ramda';
import {splitPath, joinPath} from './pathUtils';

// [] represents root dir
const appendRoot = append([]);

// If it is a file, we get rid of the filename to get dir path
const splitFilePath = compose(init, splitPath);

// convert dir strings to arrays
const mapToPath = map(splitPath);

// mapToPath for fileDB
const mapFileDir = compose(map(splitFilePath), keys);

const getParentDirs = chain(dir =>
  reduce((accum, current) =>
    append(append(current, last(accum)), accum), [], dir));

// get file paths
const getFiles = compose(uniq, mapToPath, keys);

const getDirs = compose(uniq, appendRoot, getParentDirs, uniq, concat);

/**
 * Add parent dirs that are NOT in fs.directories
 *
 * @param {path} target - absolute path of a node
 * @param {obj} fs - the filesystem object
 *
 * @return {[path]} a list of missing parent dirs
 */
const getMissingParents = (target, {directories}) =>
  filter(complement(flip(contains))(directories), getParentDirs([target]));

/**
 * add a dir and its parents (mkdir -p)
 * @param {path} target - absolute path of a file
 * @param {obj} fs - the fs object
 *
 * @returns {obj} new fileSystem object
 *
 */
export const addDir = (target, fs) =>
  evolve({
    directories: concat(getMissingParents(target, fs)),
  }, fs);

/**
 * add a file to fs and fileDB
 * Given the file's parent exists and no duplicates
 * @param {path} target - absolute path of a file
 * @param {obj} fs - the fs object
 *
 * @returns {obj} new fileSystem object
 */
export const addFile = (target, fs) =>
  evolve({
    files: append(target),
    filesDB: assoc(joinPath(target), null),
  }, fs);

/**
 * Predicate function for 'filter' to find children nodes of a dir
 * t -> n -> Boolean
 * @param {path} - t, target
 * @param {path} - n, a node
 *
 * @return {bool}, true = not a child, false otherwise
 */
const notChild = t => compose(complement(equals)(t), slice(0, length(t)));

/**
 * remove a dir with its children (rm -r)
 * @param {path} target - absolute path of a file
 * @param {obj} fs - the fs object
 *
 * @returns {obj} new fileSystem object
 *
 */
export const removeDir = (target, fs) => {
  const removeAll = filter(notChild(target));
  const removeFiles = filter(compose(notChild(target), splitFilePath, head));

  // remove all the files/dirs under target
  const transformation = {
    filesDB: compose(fromPairs, removeFiles, toPairs),
    files: removeAll,
    directories: removeAll,
  };

  return evolve(transformation, fs);
};

export const removeFile = (target, fs) =>
  evolve({
    files: filter(complement(equals)(target)),
    filesDB: dissoc(joinPath(target)),
  }, fs);

/**
 * Create a list that contains the absolute paths of all the dirs in the
 * "file system"
 *
 * @param {[String]} directories - list of directories
 * @param {obj} filesDB - file content mapped to filename
 * @param {[[string]]} homePath - the path where cd ~ redirects
 *
 * @returns {files: [[String]], directories: [[String]], filesDB}
 */
export const initFileSystem = (dirList, filesDB) => {
  const files = getFiles(filesDB);
  const directories = getDirs(mapToPath(dirList), mapFileDir(filesDB));

  const fs = {files, directories, filesDB};
  return fs;
};
