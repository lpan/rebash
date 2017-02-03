import {
  allPass, anyPass, equals, compose, type, isEmpty, complement, map, head,
  last, contains, init, or, any,
} from 'ramda';

const nameNotReserved = compose(complement, anyPass, map(equals))(['.', '..', '~']);

const notEmpty = complement(isEmpty);

export const isString = compose(equals('String'), type);

// string -> bool
export const isValidName = allPass([isString, notEmpty, nameNotReserved]);

// string -> bool
// if the string is /ayy/lmao we assume its an absolute path
export const isAbsolutePath = compose(equals('/'), head);

// string -> bool
export const isDir = compose(equals('/'), last);

// Path, fs -> bool
export const hasParents = (path, {directories}) => contains(init(path), directories);

// Path, fs -> bool
export const isFile = (path, {files}) => contains(path, files);

export const isDirectory = (path, {directories}) => contains(path, directories);

// Path, fs -> bool
export const hasChildren = (path, {directories, files}) => {
  const hasPath = any(compose(equals(path), init));
  return or(hasPath(directories), hasPath(files));
};

// Path, fs -> bool
export const doesExist = (path, {directories, files}) =>
  or(contains(path, directories), contains(path, files));
