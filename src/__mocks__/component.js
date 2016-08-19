import {toPairs, forEach, compose} from 'ramda';

const fsDefault = {
  directories: [],
  files: [],
};

const mockComponent = (currentPath = [], fileSystem = fsDefault, files = {}) => ({
  state: {
    currentPath,
    fileSystem,
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
