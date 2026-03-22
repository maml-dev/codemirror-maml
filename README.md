# codemirror-maml

[MAML](https://maml.dev) language support for [CodeMirror 6](https://codemirror.net/).

## Features

- Syntax highlighting
- Code folding (objects, arrays, raw strings)
- Auto-indentation
- Bracket matching
- Comment toggling (`#`)
- Auto-close brackets

## Installation

```bash
npm install codemirror-maml
```

## Usage

```ts
import {EditorView, basicSetup} from "codemirror"
import {maml} from "codemirror-maml"

new EditorView({
  extensions: [basicSetup, maml()],
  parent: document.body,
})
```

## API

### `maml()`

Returns a `LanguageSupport` instance for MAML.

### `mamlLanguage`

The `LRLanguage` instance for advanced use cases (e.g., custom highlighting or nesting).

## License

[MIT](LICENSE)
