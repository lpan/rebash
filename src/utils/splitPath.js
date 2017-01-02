import {split, filter, complement, isEmpty, compose} from 'ramda';

export const filterEmpty = filter(complement(isEmpty));

const splitPath = compose(filterEmpty, split('/'));

export default splitPath;
