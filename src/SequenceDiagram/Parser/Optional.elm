module SequenceDiagram.Parser.Optional exposing (optional, withDefault)

import Parser as P exposing (Parser)


{-| Try a parser, and if it fails, return Nothing.
-}
optional : Parser a -> Parser (Maybe a)
optional p =
    P.oneOf
        [ P.map Just (P.backtrackable p)
        , P.succeed Nothing
        ]


{-| Try a parser, and if it fails, return the given default value
-}
withDefault : a -> Parser a -> Parser a
withDefault default p =
    P.oneOf
        [ P.backtrackable p
        , P.succeed default
        ]
