import splitPath from './splitPath';
import {isAbsolutePath, isDir} from './validations';
import {
  init, map, keys, compose, uniq, concat, append, chain, reduce, last,
  merge, mergeWith, join, filter, flip, contains, complement,
} from 'ramda';

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
    append(append(current, last(accum)), accum), [], dir)
);

// get file paths
const getFiles = compose(uniq, mapToPath, keys);

const getDirs = compose(uniq, appendRoot, getParentDirs, uniq, concat);

/**
 * Search fs.directories, returns missing parent dirs and node
 *
 * @param {obj} fs - the filesystem object
 * @param {path} node - absolute path of a node
 *
 * @return {[path]} a list of missing parent dirs
 */
const getMissingParents = ({directories}, node) =>
  filter(complement(flip(contains))(directories), getParentDirs([node]));

/**
 * add a dir and its parents
 * @param {obj} fs - the fs object
 * @param {string} target - absolute or relative path of a file in string form
 * @param {path} currentPath - currentPath from the state
 *
 * @returns {obj} new fileSystem object
 *
 */
export const addDir = (fs, target, currentPath) => {
  const path = isAbsolutePath(target) ? splitPath(target) : append(target, currentPath);

  return mergeWith(concat, {
    directories: getMissingParents(fs, path),
  }, fs);
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
export const initFileSystem = (dirList, filesDB, username) => {
  const files = getFiles(filesDB);
  const directories = getDirs(mapToPath(dirList), mapFileDir(filesDB));

  return {files, directories};
};
