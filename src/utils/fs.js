import {
  init, map, keys, compose, uniq, concat, append, chain, reduce, last,
  mergeWith, join, filter, flip, contains, complement, equals, slice,
  length, merge,
} from 'ramda';
import splitPath from './splitPath';
import {isAbsolutePath, isDir} from './validations';

const joinPath = compose(concat('/'), join('/'));

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
  mergeWith(concat, {
    directories: getMissingParents(target, fs),
  }, fs);

/**
 * remove a dir with its children (rm -r)
 * @param {path} target - absolute path of a file
 * @param {obj} fs - the fs object
 *
 * @returns {obj} new fileSystem object
 *
 */
export const removeDir = (target, {directories, files}) => {
  // remove all the files/dirs under target
  const removeAll = filter(compose(complement(equals)(target), slice(0, length(target))));

  return {
    files: removeAll(files),
    directories: removeAll(directories),
  };
};

/**
 * Create a list that contains the absolute paths of all the dirs in the
 * "file system"
 *
 * @param {[String]} directories - list of directories
 * @param {obj} filesDB - file content mapped to filename
 *
 * @returns {files: [[String]], directories: [[String]]}
 */
export const initFileSystem = (dirList, filesDB, homePath) => {
  const files = getFiles(filesDB);
  const directories = getDirs(mapToPath(dirList), mapFileDir(filesDB));

  return addDir(homePath, {files, directories});
};
