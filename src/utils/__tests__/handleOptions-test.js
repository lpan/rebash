import genericHandleOptions from '../handleOptions';
import {compose, add, multiply} from 'ramda';

const defaultOpt = add(1);
const func1 = add(5);
const func2 = multiply(10);

const options = {
  handlers: {
    none: defaultOpt,
    a: func1,
    b: func2,
    ab: compose(func1, func2),
  },
  fulls: {
    ahhh: 'a',
  },
};

describe('findFilters()', () => {
  it('use default handler when no options given', () => {
    const initial = 12;
    const args = {
      flags: [],
      fulls: [],
    };

    const handleOptions = genericHandleOptions(options, args);

    expect(handleOptions(initial)).toBe(13);
  });

  it('should work with a flag', () => {
    const initial = 12;
    const args = {
      flags: ['b'],
      fulls: [],
    };

    const handleOptions = genericHandleOptions(options, args);

    expect(handleOptions(initial)).toBe(120);
  });

  it('should work with flags', () => {
    const initial = 12;
    const args = {
      flags: ['a', 'b'],
      fulls: [],
    };

    const handleOptions = genericHandleOptions(options, args);

    expect(handleOptions(initial)).toBe(125);
  });

  it('should work with full option', () => {
    const initial = 12;
    const args = {
      flags: [],
      fulls: ['ahhh'],
    };

    const handleOptions = genericHandleOptions(options, args);

    expect(handleOptions(initial)).toBe(17);
  });

  it('eliminates duplicates', () => {
    const initial = 12;
    const args = {
      flags: ['a', 'b'],
      fulls: ['ahhh'],
    };

    const handleOptions = genericHandleOptions(options, args);

    expect(handleOptions(initial)).toBe(125);
  });
});
