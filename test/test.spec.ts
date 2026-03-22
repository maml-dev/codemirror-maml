import {describe, it, expect} from "vitest"
import {mamlLanguage, maml} from "../src/index"
import {EditorState} from "@codemirror/state"

function parse(input: string) {
  const state = EditorState.create({doc: input, extensions: [maml()]})
  const tree = mamlLanguage.parser.parse(input)
  return tree
}

function topNodes(input: string) {
  const tree = parse(input)
  const nodes: string[] = []
  tree.cursor().iterate(
    (node) => {
      nodes.push(node.name)
    },
  )
  return nodes
}

describe("maml parser", () => {
  it("parses empty object", () => {
    const nodes = topNodes("{}")
    expect(nodes).toContain("Object")
  })

  it("parses empty array", () => {
    const nodes = topNodes("[]")
    expect(nodes).toContain("Array")
  })

  it("parses string", () => {
    const nodes = topNodes('"hello"')
    expect(nodes).toContain("String")
  })

  it("parses raw string", () => {
    const nodes = topNodes('"""hello"""')
    expect(nodes).toContain("RawString")
  })

  it("parses multiline raw string", () => {
    const nodes = topNodes('"""\nhello\nworld\n"""')
    expect(nodes).toContain("RawString")
  })

  it("parses number", () => {
    const nodes = topNodes("42")
    expect(nodes).toContain("Number")
  })

  it("parses negative number", () => {
    const nodes = topNodes("-42")
    expect(nodes).toContain("Number")
  })

  it("parses float", () => {
    const nodes = topNodes("3.14")
    expect(nodes).toContain("Number")
  })

  it("parses float with exponent", () => {
    const nodes = topNodes("1e10")
    expect(nodes).toContain("Number")
  })

  it("parses true", () => {
    const nodes = topNodes("true")
    expect(nodes).toContain("True")
  })

  it("parses false", () => {
    const nodes = topNodes("false")
    expect(nodes).toContain("False")
  })

  it("parses null", () => {
    const nodes = topNodes("null")
    expect(nodes).toContain("Null")
  })

  it("parses object with properties", () => {
    const nodes = topNodes('{ key: "value" }')
    expect(nodes).toContain("Object")
    expect(nodes).toContain("Property")
    expect(nodes).toContain("PropertyName")
  })

  it("parses object with comma-separated properties", () => {
    const nodes = topNodes('{ a: 1, b: 2 }')
    expect(nodes).toContain("Object")
    expect(nodes).toContain("Property")
  })

  it("parses object with newline-separated properties", () => {
    const nodes = topNodes('{\n  a: 1\n  b: 2\n}')
    expect(nodes).toContain("Object")
    expect(nodes).toContain("Property")
  })

  it("parses object with trailing comma", () => {
    const nodes = topNodes('{ a: 1, b: 2, }')
    expect(nodes).toContain("Object")
  })

  it("parses object with quoted key", () => {
    const nodes = topNodes('{ "quoted key": "value" }')
    expect(nodes).toContain("Property")
    expect(nodes).toContain("PropertyName")
  })

  it("parses array with values", () => {
    const nodes = topNodes('["a", "b", "c"]')
    expect(nodes).toContain("Array")
    expect(nodes).toContain("String")
  })

  it("parses array with newline-separated values", () => {
    const nodes = topNodes('[\n  "a"\n  "b"\n]')
    expect(nodes).toContain("Array")
  })

  it("parses nested objects", () => {
    const nodes = topNodes('{ outer: { inner: "value" } }')
    expect(nodes).toContain("Object")
    expect(nodes).toContain("Property")
  })

  it("parses comments", () => {
    const nodes = topNodes('# comment\n42')
    expect(nodes).toContain("LineComment")
    expect(nodes).toContain("Number")
  })

  it("parses inline comments", () => {
    const nodes = topNodes('{\n  key: "value" # comment\n}')
    expect(nodes).toContain("LineComment")
  })

  it("parses string with escape sequences", () => {
    const nodes = topNodes('"hello\\nworld"')
    expect(nodes).toContain("String")
  })

  it("parses raw string with quotes inside", () => {
    const nodes = topNodes('"""text "quoted" more"""')
    expect(nodes).toContain("RawString")
  })

  it("parses complex document", () => {
    const input = `{
  project: "MAML"
  tags: [
    "minimal"
    "readable"
  ]
  version: 1
  active: true
  notes: """
This is a raw string.
"""
}`
    const nodes = topNodes(input)
    expect(nodes).toContain("Object")
    expect(nodes).toContain("Array")
    expect(nodes).toContain("String")
    expect(nodes).toContain("RawString")
    expect(nodes).toContain("Number")
    expect(nodes).toContain("True")
  })
})

describe("maml language support", () => {
  it("exports maml function", () => {
    expect(typeof maml).toBe("function")
  })

  it("returns LanguageSupport", () => {
    const support = maml()
    expect(support).toBeDefined()
    expect(support.language).toBe(mamlLanguage)
  })

  it("has correct language name", () => {
    expect(mamlLanguage.name).toBe("maml")
  })
})
