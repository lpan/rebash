import {toPairs, forEach, compose} from 'ramda';

const mockComponent = (currentPath = [], directories = [], files = {}) => ({
  state: {
    currentPath,
    directories,
    files,
    visibles: [],
    history: [],
  },
  setState(obj) {
    const setThis = compose(
      forEach(pair => { this.state[pair[0]] = pair[1]; }),
      toPairs
    );
    setThis(obj);
  },
});

export default mockComponent;
