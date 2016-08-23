import {split, filter, complement, isEmpty, compose} from 'ramda';

const filterEmpty = filter(complement(isEmpty));

const splitPath = compose(filterEmpty, split('/'));

export default splitPath;
