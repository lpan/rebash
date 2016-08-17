jest.unmock('../initDirs');

import initDirs from '../initDirs';

describe('initDirs()', () => {
  it('splits dir path strings and eliminate invalids', () => {
    const paths = initDirs([
      '/home/lpan',
      '/etc/nginx/',
    ], {});

    expect(paths).toEqual([
      ['home', 'lpan'],
      ['etc', 'nginx'],
    ]);
  });

  it('creates dir according to filesDB', () => {
    const paths = initDirs([], {
      '/home/lpan/secret.txt': 'ayy lmao',
      '/etc/nginx/nginx.conf': 'dank mr. goose',
      '/lmao.js': 'ayy mr.goose',
    });

    expect(paths).toEqual([
      ['home', 'lpan'],
      ['etc', 'nginx'],
      [],
    ]);
  });

  it('eliminate duplicates', () => {
    const paths = initDirs([
      '/home/lpan',
      '/etc/nginx/',
    ], {
      '/home/lpan/lmao.js': null,
      '/etc/nginx/goose.config': 'goose',
    });

    expect(paths).toEqual([
      ['home', 'lpan'],
      ['etc', 'nginx'],
    ]);
  });
});
