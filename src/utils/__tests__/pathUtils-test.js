import {splitPath} from '../pathUtils';

describe('splitPath()', () => {
  it('should split path correctly', () => {
    const path = '/etc/nginx';
    const splitted = splitPath(path);

    expect(splitted).toEqual([
      'etc',
      'nginx',
    ]);
  });

  it('ignore extra ///', () => {
    const path = '////etc////nginx';
    const splitted = splitPath(path);

    expect(splitted).toEqual([
      'etc',
      'nginx',
    ]);
  });
});
