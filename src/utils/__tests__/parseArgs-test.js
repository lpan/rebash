jest.unmock('../parseArgs');

import parseArgs from '../parseArgs';

describe('parseArgs()', () => {
  it('correctly parses args', () => {
    const command = 'ls -l --goose-mode /home/lawrence';
    const args = parseArgs(command);

    expect(args).toEqual({
      options: ['goose-mode'],
      flags: ['l'],
      targets: ['/home/lawrence'],
    });
  });

  it('parses multiple flags', () => {
    const command = 'ls -al lmao';
    const args = parseArgs(command);

    expect(args).toEqual({
      options: [],
      flags: ['a', 'l'],
      targets: ['lmao'],
    });
  });

  it('sorts multiple flags', () => {
    const command = 'ls --bsian --csian --asian paninos';
    const args = parseArgs(command);

    expect(args).toEqual({
      options: ['asian', 'bsian', 'csian'],
      flags: [],
      targets: ['paninos'],
    });
  });
});
