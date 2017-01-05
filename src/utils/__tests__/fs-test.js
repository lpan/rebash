jest.unmock('../fs');

import {compose} from 'ramda';
import {initFileSystem, addDir, removeDir} from '../fs';
import {sortFs} from '../testUtils';

const newInit = compose(sortFs, initFileSystem);

describe('fs helpers', () => {
  describe('initFileSystem()', () => {
    it('splits dir path strings and eliminate invalids', () => {
      const paths = newInit([
        '/home/lpan',
        '/etc/nginx/',
      ], {}, ['home', 'lpan']);

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
      }, ['home', 'lpan']);

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
      }, ['home', 'lpan']);

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

    it('adds home dir', () => {
      const paths = newInit([
        '/home/lpan',
        '/etc/nginx/',
      ], {}, ['home', 'goose']);

      expect(paths).toEqual({
        directories: [
          [],
          ['etc'],
          ['home'],
          ['etc', 'nginx'],
          ['home', 'goose'],
          ['home', 'lpan'],
        ],
        files: [],
      });
    });
  });

  describe('addDir()', () => {
    it('creates missing parent dirs when absolute path is supplied', () => {
      const fs = newInit([
        '/home/lpan/',
      ], {}, ['home', 'lpan']);

      expect(sortFs(addDir(['home', 'goose', 'docs'], fs))).toEqual({
        directories: [
          [],
          ['home'],
          ['home', 'goose'],
          ['home', 'lpan'],
          ['home', 'goose', 'docs'],
        ],
        files: [],
      });

      expect(sortFs(addDir(['home', 'goose', 'docs'], fs))).toEqual({
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

  describe('removeDir()', () => {
    it('removes dir recursively', () => {
      const fs = newInit([
        '/home/lpan/docs',
      ], {
        '/home/lpan/docs/lmao.txt': 'ayy lmao',
      }, ['home', 'lpan']);

      expect(sortFs(removeDir(['home', 'lpan', 'docs'], fs))).toEqual({
        directories: [
          [],
          ['home'],
          ['home', 'lpan'],
        ],
        files: [],
      });
    });
  });
});
