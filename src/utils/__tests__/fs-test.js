jest.unmock('../fs');

import {initFileSystem, addDir, getMissingParents} from '../fs';
import {sortFs} from '../testUtils';
import {compose} from 'ramda';

const newInit = compose(sortFs, initFileSystem);

describe('fs helpers', () => {
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

  describe('addDir()', () => {
    it('adds dir where target is a relative path', () => {
      const fs = newInit([
        '/home/lpan',
      ], {});

      expect(sortFs(addDir(fs, 'docs', ['home', 'lpan']))).toEqual({
        directories: [
          [],
          ['home'],
          ['home', 'lpan'],
          ['home', 'lpan', 'docs'],
        ],
        files: [],
      });
    });

    it('does nothing if dir specified by relative path already exists', () => {
      const fs = newInit([
        '/home/lpan/docs',
      ], {});

      expect(sortFs(addDir(fs, 'docs', ['home', 'lpan']))).toEqual({
        directories: [
          [],
          ['home'],
          ['home', 'lpan'],
          ['home', 'lpan', 'docs'],
        ],
        files: [],
      });
    });

    it('creates missing parent dirs when absolute path is supplied', () => {
      const fs = newInit([
        '/home/lpan/',
      ], {});

      expect(sortFs(addDir(fs, '/home/goose/docs', ['home', 'lpan']))).toEqual({
        directories: [
          [],
          ['home'],
          ['home', 'goose'],
          ['home', 'lpan'],
          ['home', 'goose', 'docs'],
        ],
        files: [],
      });

      expect(sortFs(addDir(fs, '/home/goose/docs', ['home', 'lpan']))).toEqual({
        directories: [
          [],
          ['home'],
          ['home', 'goose'],
          ['home', 'lpan'],
          ['home', 'goose', 'docs'],
        ],
        files: [],
      });
    });
  });
});
