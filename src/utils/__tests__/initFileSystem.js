jest.unmock('../initFileSystem');

import initFileSystem from '../initFileSystem';

describe('initFileSystem()', () => {
  it('splits dir path strings and eliminate invalids', () => {
    const paths = initFileSystem([
      '/home/lpan',
      '/etc/nginx/',
    ], {});

    expect(paths).toEqual({
      directories: [
        ['home', 'lpan'],
        ['etc', 'nginx'],
      ],
      files: [],
    });
  });

  it('creates dir according to filesDB', () => {
    const paths = initFileSystem([], {
      '/home/lpan/secret.txt': 'ayy lmao',
      '/etc/nginx/nginx.conf': 'dank mr. goose',
      '/lmao.js': 'ayy mr.goose',
    });

    expect(paths).toEqual({
      directories: [
        ['home', 'lpan'],
        ['etc', 'nginx'],
        [],
      ],
      files: [
        ['home', 'lpan', 'secret.txt'],
        ['etc', 'nginx', 'nginx.conf'],
        ['lmao.js'],
      ],
    });
  });

  it('eliminate duplicates', () => {
    const paths = initFileSystem([
      '/home/lpan',
      '/etc/nginx/',
    ], {
      '/home/lpan/lmao.js': null,
      '/etc/nginx/goose.config': 'goose',
    });

    expect(paths).toEqual({
      directories: [
        ['home', 'lpan'],
        ['etc', 'nginx'],
      ],
      files: [
        ['home', 'lpan', 'lmao.js'],
        ['etc', 'nginx', 'goose.config'],
      ],
    });
  });
});
