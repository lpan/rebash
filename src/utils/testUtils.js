import {sortBy, identity, lensProp, over, compose} from 'ramda';

const sortPaths = sortBy(identity);

const dirLens = lensProp('directories');
const fileLens = lensProp('files');

export const sortFs = compose(
  over(dirLens, sortPaths),
  over(fileLens, sortPaths)
);

export default {};
