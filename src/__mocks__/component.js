import {toPairs, forEach, compose} from 'ramda';

const fsDefault = {
  directories: [],
  files: [],
  filesDB: {},
};

const mockComponent = (currentPath = [], fileSystem = fsDefault) => ({
  state: {
    currentPath,
    fileSystem,
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
