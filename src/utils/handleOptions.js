import {
  contains, complement, keys, forEach, has, prop, join, isEmpty, omit,
  compose, uniq, concat, props,
} from 'ramda';
import {joinPath} from './pathUtils';

// 'none' key points to defaultFilter (filter to be applied when no arg supplied
const defaultOpt = 'none';
const hasDefault = has(defaultOpt);
const pickDefault = prop(defaultOpt);
const omitDefault = omit(defaultOpt);

// if opts contains default filter
const validateDefault = (optsType) => {
  if (!hasDefault(optsType)) {
    throw new Error('Default option handler not found');
  }
};

const notContains = complement(contains);

/**
 * Get the handler according to the provided option object
 *
 * @param {[String]} opt - an array of flags eg. ['a', 'l']
 * @param {obj} optsDic - key: flag(s), pair: filter function
 *
 * @returns {func} - the handler function
 *
 */
const getHandler = (opts, optsDic) => {
  const defaultHandler = pickDefault(optsDic);
  const restHandlers = omitDefault(optsDic);

  // predicate to find the final filter
  return isEmpty(opts) ? defaultHandler : prop(join('', opts), restHandlers);
};

/**
 * Return a function to determine what filters to return according to its flags
 *
 * @param {obj} opts - configuration object
 * @param {obj} args - args object from parseArgs()
 * @param {any} data - initial data
 *
 * @see /commands/ls.js
 *
 * @returns {func} - composed filters
 */
const handleOptions = (opts, {fulls, flags}) => {
  const validateFulls = forEach((full) => {
    if (notContains(full, keys(opts.fulls))) {
      throw new Error(`--${full}: no such option`);
    }
  });

  const validateFlags = forEach((flag) => {
    if (notContains(flag, keys(opts.handlers))) {
      throw new Error(`-${flag}: no such option`);
    }
  });

  // Throw an error if options are invalid
  validateFulls(fulls);
  validateFlags(flags);

  const options = compose(uniq, concat(flags), props(fulls))(opts.fulls);

  // see if flags contain default filter
  validateDefault(opts.handlers);

  return getHandler(options, opts.handlers);
};

// (fn, fn) -> (Path, FileSystem)
// Throw error if the expectation is not met
export const genExpect = (expectation, makeError) => (target, fs) => {
  if (!expectation(target, fs)) {
    throw new Error(makeError(joinPath(target)));
  }
  return [target, fs];
};

export default handleOptions;
