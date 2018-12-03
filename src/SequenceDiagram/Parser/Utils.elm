module SequenceDiagram.Parser.Utils exposing (characters_, colon, doubleQuote, doubleQuotes, eol, is, isDoubleQuote, isNewLine, isSentenceLiteral, isSpace, isStringLiteral, sentence, space, spaces, spaces1, word, words)

import Parser as P exposing ((|.), (|=), Parser, Problem, end, int, keyword, lazy, oneOf, succeed, symbol)


words : Parser (List String)
words =
    P.sequence
        { start = "["
        , separator = ","
        , end = "]"
        , spaces = spaces
        , item = word
        , trailing = P.Forbidden
        }


space : Parser ()
space =
    P.chompIf isSpace


colon : Parser ()
colon =
    P.chompIf isColon



-- spaces : Parser ()
-- spaces =
--     P.chompWhile isSpace


spaces : Parser ()
spaces =
    P.chompWhile (\c -> c == ' ')


spaces1 : Parser ()
spaces1 =
    succeed ()
        |. space
        |. spaces


isSpace : Char -> Bool
isSpace =
    is ' '


isColon : Char -> Bool
isColon =
    is ':'


isNewLine : Char -> Bool
isNewLine =
    is '\n'


is : Char -> Char -> Bool
is searched char =
    char == searched


eol : Parser ()
eol =
    P.chompUntilEndOr "\n"


word : Parser String
word =
    succeed ()
        |. P.chompWhile isStringLiteral
        |> P.getChompedString


isStringLiteral : Char -> Bool
isStringLiteral c =
    Char.isDigit c
        || Char.isUpper c
        || Char.isLower c


isSentenceLiteral : Char -> Bool
isSentenceLiteral c =
    isSpace c
        || Char.isDigit c
        || Char.isUpper c
        || Char.isLower c


sentence : P.Parser String
sentence =
    succeed ()
        |. P.chompWhile isSentenceLiteral
        |> P.getChompedString



-- characters_ (not << isNewLine)


doubleQuotes : P.Parser String
doubleQuotes =
    P.succeed identity
        |. P.symbol "\""
        |= characters_ (not << isDoubleQuote)
        |. P.symbol "\""


{-| -}
characters_ : (Char -> Bool) -> P.Parser String
characters_ isOk =
    P.succeed ()
        |. P.chompWhile isOk
        |> P.getChompedString


doubleQuote : Char
doubleQuote =
    '"'


isDoubleQuote : Char -> Bool
isDoubleQuote char =
    char == doubleQuote
