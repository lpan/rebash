import {
  compose, contains, complement, keys, apply, map, forEach, concat, curry,
  split, pick, omit, has, pickBy, equals, toPairs, last,
} from 'ramda';

// 'none' key points to defaultFilter (filter to be applied when no arg supplied
const noOpts = 'none';
const hasNone = has(noOpts);
const pickNone = pick([noOpts]);
const omitNone = omit([noOpts]);

// if opts contains default filter
const validateDefault = optsType => {
  if (hasNone(optsType)) {
    throw new Error('Default filter not found');
  }
};

const notContains = complement(contains);

// when the object has only one key val pair, get the val
const getVal = compose(last, last, toPairs);

const composeN = apply(compose);

/**
 * Get the filter according to the provided option object
 *
 * @param {[String]} opt - an array of options/flags from parseArgs
 * @param {obj} optsDic - key: flag(s), pair: filter function
 *
 * @returns {obj} - object, key: flags/options, val: filter
 *
 */
const getFilter = (opt, optsDic) => {
  const defaultOpt = pickNone(optsDic);
  const restOpts = omitNone(optsDic);

  // predicate to find the final filter
  const findOpt = (val, key) => equals(split('', key), opt);
  return opt ? getVal(pickBy(findOpt, restOpts)) : defaultOpt;
};

/**
 * Return a function to determine what filters to return according to
 * options/flags
 *
 * @param {obj} opts - configuration object
 * @param {obj} args - args object from parseArgs()
 * @param {any} data - initial data
 * @returns {func} - composed filters
 */
const findFilters = curry((opts, {options, flags}, data) => {
  const validateOptions = forEach(option => {
    if (notContains(option, keys(opts.options))) {
      throw new Error(`--${option}: no such option`);
    }
  });

  const validateFlags = forEach(flag => {
    if (notContains(flag, keys(opts.flags))) {
      throw new Error(`-${flag}: no such option`);
    }
  });

  // Inevitable side effects here :P
  // Throw an error if option/flag is invalid
  validateOptions(options);
  validateFlags(flags);

  // see if options contain default filter
  validateDefault(options);
  validateDefault(flags);

  console.warn(getFilter(flags, opts.flags));

  return getFilter(flags, opts.flags);

  /*
  const optionsFilters = map(option => opts.options[option], options);
  const flagsFilters = map(flag => opts.flags[flag], flags);

  const finalFilters = compose(composeN, concat);

  return finalFilters(optionsFilters, flagsFilters)(data);
  */
});

export default findFilters;
