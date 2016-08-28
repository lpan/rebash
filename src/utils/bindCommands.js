import {isValidElement} from 'react';
import {isString} from './validations';
import parseArgs from './parseArgs';
import {
  assoc, append, reduce, compose, toPairs, flatten, type, anyPass, lensProp, over,
  lensIndex,
} from 'ramda';

/**
 * Add an output to 'outputs' of the latest visible
 *
 * @param {[Obj]} visibles, array of {command: '', outputs: []}
 * @param {String|[String]} newOutput, the string we wish to push to the screen
 *
 * @returns {[Obj]}, new 'visibles' that has 'newOutput' appended to outputs
 */
const appendOutput = ({visibles}, newOutput) => {
  const outputLens = lensProp('outputs');
  const lastLens = lensIndex(-1);

  const appendNewOutput = compose(flatten, append(newOutput));
  const updateLast = v => over(outputLens, appendNewOutput, v);

  return over(lastLens, updateLast, visibles);
};

/**
 * Decorates the function mapped to a command so that it will update 'history' and
 * 'visible' when it is called.
 *
 * @param {func} commmandFn, the funciton mapped to a command
 * @param {obj} self, essentially the 'this' of the Container component
 *
 * @returns {func}, modified function
 */
const decorateSelf = ([commandName, commandFn], self) => command => {
  const {history, visibles, currentPath} = self.state;
  const args = parseArgs(command);

  const newState = {
    history: [...history, command],
    visibles: [...visibles, {command, currentPath, outputs: []}],
  };

  self.setState(newState);

  const result = commandFn(args, self);
  const isValidOutput = anyPass([isValidElement, isString]);

  if (isValidOutput(result)) {
    self.setState({
      visibles: appendOutput(newState, result),
    });
  }

  // if output returns an unresolved promise
  if (result && type(result.then) === 'Function') {
    result.then(output => {
      self.setState({visibles: appendOutput(newState, output)});
    });
  }
};

/**
 * Apply decorateSelf to all of the functions in the map
 *
 * @param {[command]: commandFn} commands, commandFns mapped to commands
 * @param {obj} self, essentially the 'this' of the Container component
 *
 * @returns {[command]: commandFn}, modified commandFns
 */
const bindCommands = (commands, self) =>
  compose(
    reduce((accum, pair) => assoc(pair[0], decorateSelf(pair, self), accum), {}),
    toPairs
  )(commands);

export default bindCommands;
