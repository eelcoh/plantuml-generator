module SequenceDiagram.Parser exposing (parse)

{-|


# Parsers

@docs parse

-}

import Parser as P exposing ((|.), (|=), Parser, Problem, andThen, end, int, keyword, lazy, oneOf, succeed, symbol)
import Parser.Indent as Indent
import SequenceDiagram.Model exposing (..)
import SequenceDiagram.Parser.Optional as Optional
import SequenceDiagram.Parser.Utils as Utils


{-| parses a Sequence Diagram document into a Sequence Diagram Model
-}
parse : String -> Result String Sequence
parse input =
    case P.run sequence input of
        Ok s ->
            Ok s

        Err d ->
            "Oops: "
                ++ P.deadEndsToString d
                |> Err


sequence : Parser Sequence
sequence =
    let
        proceed participant_ =
            succeed (Sequence participant_)
                |= Indent.list step
    in
    succeed identity
        |. P.spaces
        |. keyword "sequence"
        |. Utils.spaces1
        |= participant
        |. Utils.spaces
        |. Utils.eol
        |> P.andThen proceed



{-
   The caption, the options and the list of child steps are all optional.
   Becaus of that, there are many options here.
    1. string eol
    2. string spaces1 eol
    3. string spaces1 doubleQuotes eol
    4. string spaces1 doubleQuotes spaces eol
    5. string spaces1 options eol
    6. string spaces1 options spaces eol
    7. string spaces1 doubleQuotes spaces1 options eol
    8. string spaces1 doubleQuotes spaces1 options spaces eol
-}


step : Parser Step
step =
    let
        step_ participant_ ( caption_, options_, steps_ ) =
            Step participant_ caption_ options_ steps_
    in
    P.succeed step_
        |= participant
        |= P.oneOf
            [ P.succeed identity
                -- we hit a space
                -- there may be a caption,
                -- there may be options
                |. Utils.spaces1
                |= P.oneOf
                    [ P.succeed identity
                        |= P.oneOf
                            [ P.succeed (\o s -> ( Nothing, o, s ))
                                -- There is no caption,
                                -- there are options
                                |= options
                                |. Utils.spaces
                                |= stepEnd
                            , P.succeed (\c ( o, s ) -> ( Just c, o, s ))
                                -- There is a caption, we don't know yet
                                -- whether there are options
                                |= caption
                                |= P.oneOf
                                    [ P.succeed identity
                                        |= P.oneOf
                                            [ P.succeed identity
                                                -- we first hit a space
                                                -- options is still a noption
                                                |. Utils.spaces1
                                                |= P.oneOf
                                                    [ P.succeed (\o s -> ( o, s ))
                                                        -- yes, there are options
                                                        |= options
                                                        |. Utils.spaces
                                                        |= stepEnd
                                                    , P.succeed (\s -> ( [], s ))
                                                        -- no options, after the space
                                                        -- we still hit the eol
                                                        |= stepEnd
                                                    ]
                                            , P.succeed (\s -> ( [], s ))
                                                -- we directly hit eol
                                                -- so there are no options
                                                |= stepEnd
                                            ]
                                    ]
                            ]
                    , P.succeed (\s -> ( Nothing, [], s ))
                        -- There is no caption,
                        -- there are no options
                        |= stepEnd
                    ]
            , P.succeed (\s -> ( Nothing, [], s ))
                -- no space, we directly hit the eolof stepEnd
                -- there is no caption,
                -- there are no options
                |= stepEnd
            ]


step2 : Parser Step
step2 =
    let
        s1 participant_ ( caption_, options_ ) steps_ =
            Step participant_ caption_ options_ steps_

        s2 participant_ steps_ =
            Step participant_ Nothing [] steps_
    in
    P.oneOf
        [ P.succeed s1
            |= participant
            |. Utils.spaces1
            |= P.oneOf
                -- 1. no caption, options only
                -- 2. with caption, and *maybe* there are options
                [ P.succeed (\o -> ( Nothing, o ))
                    |= options
                , P.succeed (\s o -> ( Just s, o ))
                    |= caption
                    |= Optional.withDefault [] (leadingSpaces options)
                ]
            |. Utils.spaces
            |= stepEnd
        , P.succeed s2
            -- if neither caption and options are given
            |= participant
            |= stepEnd
        ]


stepEnd : Parser (List Step)
stepEnd =
    P.oneOf
        [ succeed identity
            -- always require at least one new line
            |. Utils.eol
            |= Indent.list (lazy (\_ -> step))
        , succeed []
            -- the input string may just end here
            |. P.end
        ]


caption : Parser String
caption =
    Utils.doubleQuotes


participant : Parser String
participant =
    Utils.string


leadingSpaces : Parser a -> Parser a
leadingSpaces p =
    succeed identity
        |. Utils.spaces1
        |= p


options : Parser (List Option)
options =
    P.sequence
        { start = "["
        , separator = ","
        , end = "]"
        , spaces = Utils.spaces
        , item = option
        , trailing = P.Forbidden
        }


option : Parser Option
option =
    oneOf
        [ return
        , async
        ]


return : Parser Option
return =
    succeed Return
        |. keyword "return"
        |. Utils.spaces1
        |= Utils.doubleQuotes


async : Parser Option
async =
    succeed Async
        |. Utils.spaces
        |. keyword "async"
