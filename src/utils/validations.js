import {
  allPass, equals, compose, type, isEmpty, complement, contains,
} from 'ramda';

const notEmpty = complement(isEmpty);

export const isString = compose(equals('String'), type);

export const isValidName = allPass([isString, notEmpty]);

// if the string is /ayy/lmao we assume its an absolute path
export const isAbsolutePath = contains('/');
