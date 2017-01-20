import {compose} from 'ramda';
import {
  isValidName, isAbsolutePath, isDir, hasParents, doesExist, hasChildren,
} from '../validations';

describe('validation helpers', () => {
  describe('isValidName()', () => {
    it('validates', () => {
      expect(isValidName('lawrence')).toBe(true);
    });

    it('identities empty', () => {
      expect(isValidName('')).toBe(false);
    });

    it('identifies reserved names', () => {
      expect(isValidName('.')).toBe(false);
      expect(isValidName('..')).toBe(false);
      expect(isValidName('~')).toBe(false);
    });
  });

  describe('isAbsolutePath()', () => {
    it('validates', () => {
      expect(isAbsolutePath('/lmao/ayy/goose')).toBe(true);
      expect(isAbsolutePath('lmao/dfdfdf')).toBe(false);
      expect(isAbsolutePath('mrGoose')).toBe(false);
    });
  });

  describe('isDir()', () => {
    it('validates', () => {
      expect(isDir('lmao/')).toBe(true);
      expect(isDir('goose')).toBe(false);
      expect(isDir('goose/lmao')).toBe(false);
    });
  });

  describe('fs validations', () => {
    const mockFs = {
      directories: [
        [],
        ['etc'],
        ['etc', 'nginx'],
        ['home'],
        ['home', 'lpan'],
      ],
      files: [
        ['etc', 'nginx', 'nginx.conf'],
      ],
      filesDB: {},
    };

    describe('hasParents()', () => {
      it('validates', () => {
        expect(hasParents(['lpan'], mockFs)).toBe(true);
        expect(hasParents(['etc', 'nginx'], mockFs)).toBe(true);
        // root's parent is itself
        expect(hasParents([], mockFs)).toBe(true);
      });
    });

    describe('doesExist()', () => {
      it('validates', () => {
        expect(doesExist(['home', 'lpan'], mockFs)).toBe(true);
        expect(doesExist(['home', 'goose'], mockFs)).toBe(false);
      });
    });

    describe('hasChildren()', () => {
      it('validates', () => {
        expect(hasChildren(['lpan'], mockFs)).toBe(false);
        expect(hasChildren(['etc', 'nginx'], mockFs)).toBe(true);
        expect(hasChildren(['home'], mockFs)).toBe(true);
        expect(hasChildren([], mockFs)).toBe(true);
      });
    });
  });
});
