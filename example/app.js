import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'react-term';
import {head} from 'ramda';

const commands = {
  'open-window': args => { alert(head(args)); },
};

const files = {
  '/home/lawrence/greet.txt': 'Hello',
};

const directories = [
  '/home/lpan',
  '/etc/nginx/',
];

ReactDOM.render(
  <Terminal
    files={files}
    directories={directories}
    commands={commands}
  />,
  document.getElementById('root')
);
