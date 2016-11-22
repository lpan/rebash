import genericFindFilters from '../findFilters';
import {inc, dec} from 'ramda';

const options = {
  flags: {
    a: dec,
    b: inc,
  },
  options: {
    lmao: () => 'ayy lmao',
  },
};

const findFilters = genericFindFilters(options);

describe('findFilters()', () => {
  it('should work with a flag', () => {
    const initial = 12;
    const args = {
      flags: ['b'],
      options: [],
    };

    expect(findFilters(args, initial)).toBe(13);
  });

  it('should work with a flags', () => {
    const initial = 12;
    const args = {
      flags: ['b', 'a'],
      options: [],
    };

    expect(findFilters(args, initial)).toBe(12);
  });

  it('should work with an option', () => {
    const initial = 12;
    const args = {
      flags: [],
      options: ['lmao'],
    };

    expect(findFilters(args, initial)).toBe('ayy lmao');
  });

  it('process flags first', () => {
    const initial = 12;
    const args = {
      flags: ['a', 'b'],
      options: ['lmao'],
    };

    expect(findFilters(args, initial)).toBe('ayy lmao');
  });
});
