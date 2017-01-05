import {isValidName} from '../validations';

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
});
