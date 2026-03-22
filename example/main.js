import {EditorView, basicSetup} from "codemirror"
import {maml} from "../src/index.ts"

const doc = `# MAML example
{
  project: "MAML"
  version: 1
  active: true
  legacy: null

  tags: [
    "minimal"
    "readable"
    "fast"
  ]

  author: {
    name: "Anton Medvedev"
    url: "https://medv.io"
  }

  # Nested objects in array
  examples: [
    {
      name: "hello"
      score: 3.14
      negative: -42
      exponent: 1e10
    }
    {
      name: "world"
      score: 2.718
    }
  ]

  description: """
This is a raw multiline string.
It preserves "quotes" and \\escapes as-is.
No special handling needed.
"""

  "quoted key": "value with \\"escapes\\" and \\n newlines"

  # Trailing commas are fine
  colors: [
    "red",
    "green",
    "blue",
  ]
}
`

new EditorView({
  doc,
  extensions: [basicSetup, maml()],
  parent: document.getElementById("editor"),
})
