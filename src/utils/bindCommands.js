import {
  assoc, append, reduce, compose, toPairs, last, flatten, type, equals, init,
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
  const {outputs, command} = last(visibles);
  const restVisibles = init(visibles);

  const appendNewOutput = compose(flatten, append(newOutput));

  return [...restVisibles, {command, outputs: appendNewOutput(outputs)}];
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
const decorateSelf = ([command, commandFn], self) => args => {
  const {history, visibles} = self.state;

  const newState = {
    history: [...history, command],
    visibles: [...visibles, {command, outputs: []}],
  };

  self.setState(newState);

  const result = commandFn(self, args);
  const isString = compose(equals('String'), type);

  if (isString(result)) {
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
