# Rebash
Terminal emulator component for React!

[![License][license-image]][license-url]

## Installation and Usage
```
npm install --save rebash
```

## Include the Component

```
import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'rebash';

const files = {
  '/home/lawrence/test.txt': 'I am a test',
};

const directories = [
  '/etc/',
];

const initialPath = [];

const commands = {
  'open-window': args => { alert(args.targets[0]); },
  'ghetto-cowsay': args => `cow says: "${args.targets[0]}"`,
};

const MyTerminal = () => (
  <Terminal
    files={files}
    directories={directories}
    commands={commands}
    initialPath={initialPath}
  />,
  document.getElementById('root')
);

export default MyTerminal;
```

### API

#### Props

###### username:
Unix username to display on the terminal.

- type: `String`
- default: `root`
- eg: `lawrence`

###### directories:
A list of directories represented by their absolute paths

- type: `Array of Strings`
- default: `[]`
- eg: `['/home', '/etc/nginx/']`

###### files
Map used to look up files. `{'/absolute/path': 'file content'}`

**note:** There is no need to manually create the parent dirs for those files.
Rebash will take care of them.

- type: `Map of Strings`
- default: `{}`
- eg: `{'/home/goose.txt': 'Mr. Goose is life', '/lmao.txt': null}`

###### initialPath
Initial path when the `Terminal` is rendered

- type: `String`
- default: `/`
- eg: `'/home/lawrence'`

###### commands
A list of custom commands. See `Custom commands` section for more information.

- type: `Map of Functions`
- default: `{}`
- eg: `{'say-hello': ({targets}) => 'hello ' + targets[0]}`
