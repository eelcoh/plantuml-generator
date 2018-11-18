module SequenceDiagram.Parser.Utils exposing (characters_, doubleQuote, doubleQuotes, eol, is, isDoubleQuote, isNewLine, isSentenceLiteral, isSpace, isStringLiteral, space, spaces, spaces1, string, strings)

import Parser as P exposing ((|.), (|=), Parser, Problem, end, int, keyword, lazy, oneOf, succeed, symbol)


strings : Parser (List String)
strings =
    P.sequence 
        { start = "["
        , separator = ","
        , end = "]"
        , spaces = spaces
        , item = string
        , trailing = P.Forbidden
        }


space : Parser ()
space =
    P.chompIf isSpace



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


isNewLine : Char -> Bool
isNewLine =
    is '\n'


is : Char -> Char -> Bool
is searched char =
    char == searched


eol : Parser ()
eol =
    P.chompUntilEndOr "\n"


string : Parser String
string =
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
