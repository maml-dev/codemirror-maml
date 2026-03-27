import {parser} from "./syntax.grammar"
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const mamlLanguage = LRLanguage.define({
  name: "maml",
  parser: parser.configure({
    props: [
      styleTags({
        "PropertyName/Identifier": t.propertyName,
        "PropertyName/String": t.propertyName,
        String: t.string,
        Escape: t.escape,
        RawString: t.special(t.string),
        Number: t.number,
        "True False": t.bool,
        Null: t.null,
        LineComment: t.lineComment,
        "{ }": t.brace,
        "[ ]": t.squareBracket,
        ":": t.punctuation,
        ",": t.separator,
      }),
      indentNodeProp.add({
        Object: delimitedIndent({closing: "}"}),
        Array: delimitedIndent({closing: "]"}),
      }),
      foldNodeProp.add({
        Object: foldInside,
        Array: foldInside,
        RawString(node) {
          if (node.to - node.from > 6) {
            return {from: node.from + 3, to: node.to - 3}
          }
          return null
        },
      }),
    ],
  }),
  languageData: {
    commentTokens: {line: "#"},
    closeBrackets: {brackets: ["[", "{", '"']},
    indentOnInput: /^\s*[\]}]$/,
  },
})

export function maml() {
  return new LanguageSupport(mamlLanguage)
}
