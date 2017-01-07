import {
  split, filter, complement, isEmpty, compose, concat, join,
} from 'ramda';
import {isAbsolutePath} from '../utils/validations';

export const filterEmpty = filter(complement(isEmpty));

export const splitPath = compose(filterEmpty, split('/'));

export const joinPath = compose(concat('/'), join('/'));

export const toPath = currentPath => target =>
  isAbsolutePath(target) ? splitPath(target) : concat(currentPath, splitPath(target));
