import {
  allPass, anyPass, equals, compose, type, isEmpty, complement, map, head,
  last, contains, init, or,
} from 'ramda';

const nameNotReserved = compose(complement, anyPass, map(equals))(['.', '..', '~']);

const notEmpty = complement(isEmpty);

export const isString = compose(equals('String'), type);

export const isValidName = allPass([isString, notEmpty, nameNotReserved]);

// if the string is /ayy/lmao we assume its an absolute path
export const isAbsolutePath = compose(equals('/'), head);

export const isDir = compose(equals('/'), last);

export const hasParents = (path, {directories}) => contains(init(path), directories);

export const hasDuplicate = (path, {directories, files}) =>
  or(contains(path, directories), contains(path, files));
