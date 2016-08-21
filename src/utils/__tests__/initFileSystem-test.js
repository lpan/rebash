jest.unmock('../initFileSystem');

import initFileSystem from '../initFileSystem';
import {sortFs} from '../testUtils';
import {compose} from 'ramda';

const newInit = compose(sortFs, initFileSystem);

describe('initFileSystem()', () => {
  it('splits dir path strings and eliminate invalids', () => {
    const paths = newInit([
      '/home/lpan',
      '/etc/nginx/',
    ], {});

    expect(paths).toEqual({
      directories: [
        [],
        ['etc'],
        ['home'],
        ['etc', 'nginx'],
        ['home', 'lpan'],
      ],
      files: [],
    });
  });

  it('creates dir according to filesDB', () => {
    const paths = newInit([], {
      '/home/lpan/secret.txt': 'ayy lmao',
      '/etc/nginx/nginx.conf': 'dank mr. goose',
      '/lmao.js': 'ayy mr.goose',
    });

    expect(paths).toEqual({
      directories: [
        [],
        ['etc'],
        ['home'],
        ['etc', 'nginx'],
        ['home', 'lpan'],
      ],
      files: [
        ['lmao.js'],
        ['etc', 'nginx', 'nginx.conf'],
        ['home', 'lpan', 'secret.txt'],
      ],
    });
  });

  it('eliminate duplicates', () => {
    const paths = newInit([
      '/home/lpan',
      '/etc/nginx/',
    ], {
      '/home/lpan/lmao.js': null,
      '/etc/nginx/goose.config': 'goose',
    });

    expect(paths).toEqual({
      directories: [
        [],
        ['etc'],
        ['home'],
        ['etc', 'nginx'],
        ['home', 'lpan'],
      ],
      files: [
        ['etc', 'nginx', 'goose.config'],
        ['home', 'lpan', 'lmao.js'],
      ],
    });
  });
});
