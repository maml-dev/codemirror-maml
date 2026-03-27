import {ExternalTokenizer} from "@lezer/lr"
import {stringContent, Escape} from "./syntax.grammar.terms"

const Backslash = 92 as number, Quote = 34 as number, LF = 10 as number, CR = 13 as number,
  uChar = 117 as number, LBrace = 123 as number, RBrace = 125 as number

function isHex(ch: number) {
  return (ch >= 48 && ch <= 57) || (ch >= 65 && ch <= 70) || (ch >= 97 && ch <= 102)
}

export const stringTokenizer = new ExternalTokenizer((input) => {
  if (input.next === Backslash) {
    input.advance()
    if (input.next === uChar) {
      input.advance()
      if (input.next === LBrace) {
        input.advance()
        while (isHex(input.next)) input.advance()
        if (input.next === RBrace) input.advance()
      }
    } else if (input.next >= 0) {
      input.advance()
    }
    input.acceptToken(Escape)
  } else if (input.next !== Quote && input.next !== LF && input.next !== CR && input.next >= 0) {
    while (input.next !== Quote && input.next !== Backslash &&
    input.next !== LF && input.next !== CR && input.next >= 0) {
      input.advance()
    }
    input.acceptToken(stringContent)
  }
}, {contextual: true})
