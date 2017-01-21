# [Rebash](http://lpan.io/rebash/)
Terminal emulator component for React!

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/lpan/rebash/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/localeval.svg?style=flat-square)](https://www.npmjs.com/package/rebash)


## Installation and Usage
```
npm install --save rebash
```

## Developer Setup
```bash
git clone https://github.com/lpan/rebash
cd rebash
npm install
npm start # server will listen on localhost:8080
```

## Include the Component

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'rebash';

const files = {
  '/home/lawrence/test.txt': 'I am a test',
};

const directories = [
  '/etc/',
];

const initialPath = ['/home/goose'];

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

## API

### Props

#### username:

- description: Unix username to display on the terminal.
- type: `String`
- default: `root`
- eg: `lawrence`

#### directories:

- description: A list of directories represented by their absolute paths
- type: `Array of Strings`
- default: `[]`
- eg: `['/home', '/etc/nginx/']`

#### files

- description: Map used to look up files. `{'/absolute/path': 'file content'}`
- type: `Map of Strings`
- default: `{}`
- eg: `{'/home/goose.txt': 'Mr. Goose is life', '/lmao.txt': null}`

#### initialPath

- description: Initial path when the `Terminal` is rendered
- type: `String`
- default: `/`
- eg: `'/home/lawrence'`

#### commands

- description: A list of custom commands.
- type: `Map of Functions`
- default: `{}`
- eg: `{'say-hello': ({targets}) => 'hello ' + targets[0]}`

See
[Custom commands](https://github.com/lpan/rebash#custom-commands) for more information.

### Custom commands
Before you begin, you may want to take a look at
[src/commands/index.js](src/commands/index.js) for all the built-in commands and
how they are implemented.

A `command` is a JavaScript function that takes **2 parameters**, namely `args` and
`self`.

A typical command will look like this:
```javascript
const clearThenSayHello = (args, self) => {
  self.setState({ visibles: [] });
  return `Hello ${args.targets[0]}`;
};

const commads = { 'clear-hello': clearThenSayHello };

// then we pass commands as a prop to the Terminal component
```

#### args
An object consists of three fields: `targets`, `flags` and `fulls`.

When `clear-hello -b -dc --all myDir yourDir` is entered, the Rebash argument
parser will produce the following object and pass it to the command function as
`args`.

```javascript
{
  targets: ['myDir', 'yourDir'],
  flags: ['b', 'c', 'd'],
  fulls: ['all'],
}
```

See [src/utils/parseArgs.js](src/utils/parseArgs.js) for more information

#### self
You do not want to mess with `self` unless you want to mutate the internal state
of Rebash. In fact, `self` is just a reference to the instance of the
top level React Component. You can access the component state from `self.state`,
mutate the state and trigger the component to rerender with `self.setState`,
etc.

see [src/Terminal.js](src/Terminal.js) for more information.

#### Print something out
To print out some text, you can either return a string, or throw an error. The
`clear-hello` command shown above will print `hello Lawrence` if I type `clear-hello
lawrence`.
