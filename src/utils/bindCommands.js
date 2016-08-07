import {assoc, reduce, compose, toPairs} from 'ramda';

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
  const output = commandFn(self, args);
  const {history, visibles} = self.state;

  self.setState({history: [...history, command]});

  if (typeof output !== 'undefined') {
    self.setState({history: [...history, command]});
    self.setState({visibles: [...visibles, [command, output]]});
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
