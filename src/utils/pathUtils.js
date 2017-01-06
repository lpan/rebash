import {
  split, filter, complement, isEmpty, compose, concat, join,
} from 'ramda';

export const filterEmpty = filter(complement(isEmpty));

export const splitPath = compose(filterEmpty, split('/'));

export const joinPath = compose(concat('/'), join('/'));
