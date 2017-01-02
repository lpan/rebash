import {
  split, take, T, equals, tail, compose, reduce, cond, objOf, head, mergeWith,
  drop, concat, flip, append, map,
} from 'ramda';

// need to make it an array so we can use concat
// We use concat because user can inputs multiple flags at once
// eg. 'ls -al' -> ['a', 'l']
const toArray = flip(append)([]);

const parseFlag = compose(objOf('flags'), split(''), tail);

const parseOption = compose(objOf('options'), toArray, drop(2));

const parseTarget = compose(objOf('targets'), toArray);

const classifyArg = cond([
  [compose(equals('--'), take(2)), parseOption],
  [compose(equals('-'), head), parseFlag],
  [T, parseTarget],
]);

const mergeArg = mergeWith(concat);

const formatArgs = reduce((accum, current) =>
  mergeArg(accum, classifyArg(current)),
  {options: [], flags: [], targets: []}
);

const getArgs = compose(tail, split(' '));

const sortArgs = map(args => args.sort());

/**
 * Parse raw command and returns an args object
 * 'ls -a -l --lmao' -> {options: [], flags: ['a', 'l'], options: ['lmao']}
 *
 * @param {String} Command - raw command from user
 *
 * @returns {obj} - {options: [], flags: [], targets: []}
 */
const parseArgs = compose(sortArgs, formatArgs, getArgs);

export default parseArgs;
