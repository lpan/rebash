import {sortBy, length, lensProp, over, compose, prop} from 'ramda';

const sortByAlpha = sortBy(prop(0));
const sortByLength = sortBy(length);

const sortPaths = compose(sortByLength, sortByAlpha);

const dirLens = lensProp('directories');
const fileLens = lensProp('files');

export const sortFs = compose(
  over(dirLens, sortPaths),
  over(fileLens, sortPaths)
);

export default {};
