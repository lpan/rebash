import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'rebash';

// custom commands
const commands = {
  'open-window': args => { alert(args.targets[0]); },
  'ghetto-cowsay': args => `cow says: "${args.targets[0]}"`,
};

// map of files
const files = {
  '/test.txt': 'I am a test',
  '/home/lawrence/greet.txt': 'Hello',
  '.config/nvim/init.vim': 'lmao',
};

// a list of directories
const directories = [
  '/home/lpan',
  '/etc/nginx/',
];

// The initial path of the shell when the component rendered
const initialPath = [];

ReactDOM.render(
  <Terminal
    files={files}
    directories={directories}
    commands={commands}
    initialPath={initialPath}
  />,
  document.getElementById('root')
);
