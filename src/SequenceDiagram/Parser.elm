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
        |. Utils.colon
        |. Utils.eol
        |> P.andThen proceed



{-
   The caption, the options and the list of child steps are all optional.
   Becaus of that, there are many options here.
    1. word end
    2. word caption end
    6. word spaces1 options end
    2. word spaces1 caption end
    4. string spaces1 options colon end
    5. string spaces1 options spaces1 colon end

    1. string eol
    2. string spaces1 eol
    3. string spaces1 doubleQuotes eol
    4. string spaces1 doubleQuotes spaces eol
    5. string spaces1 options eol
    6. string spaces1 options spaces eol
    7. string spaces1 doubleQuotes spaces1 options eol
    8. string spaces1 doubleQuotes spaces1 options spaces eol
-}
-- step : Parser Step
-- step =
--     P.oneOf
--         [ returnStep
--         , callStep
--         ]
-- returnStep : Parser Step
-- returnStep =
--     P.succeed (\mS -> Return mS)
--         |= Parser.keyword


step : Parser Step
step =
    let
        step_ participant_ ( options_, caption_, steps_ ) =
            Step participant_ options_ caption_ steps_
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
                            [ P.succeed (\c s -> ( [], Just c, s ))
                                -- There are no options,
                                -- there is a caption
                                |= caption
                                |. Utils.spaces
                                |= stepEnd
                            , P.succeed (\o ( mC, s ) -> ( Debug.log "options" o, mC, s ))
                                -- There are options, we don't know yet
                                -- whether there is a caption
                                |= options
                                |. Utils.spaces
                                |= P.oneOf
                                    [ P.succeed identity
                                        |= P.oneOf
                                            [ P.succeed (\c s -> ( Just c, s ))
                                                -- yes, there are options
                                                |= caption
                                                |= stepEnd
                                            , P.succeed (\s -> ( Nothing, s ))
                                                -- we directly hit eol
                                                -- so there are no options
                                                |= stepEnd

                                            -- , P.succeed identity
                                            --     |= P.oneOf
                                            --         [ P.succeed (\c s -> ( Just (Debug.log " caption3" c), s ))
                                            --             -- yes, there are options
                                            --             |= caption
                                            --             |. Utils.spaces
                                            --             |= stepEnd
                                            --         , P.succeed (\s -> ( Debug.log "no caption no 1" Nothing, s ))
                                            --             -- no options, after the space
                                            --             -- we still hit the eol
                                            --             |= stepEnd
                                            --         ]
                                            -- , P.succeed (\s -> ( Debug.log "no caption no 2" Nothing, s ))
                                            --     -- we directly hit eol
                                            --     -- so there are no options
                                            --     |= stepEnd
                                            ]
                                    ]
                            ]
                    , P.succeed (\s -> ( [], Nothing, s ))
                        -- There is no caption,
                        -- there are no options
                        |= stepEnd
                    ]
            , P.succeed (\c s -> ( [], Just c, s ))
                -- no space, we directly hit the caption
                -- there are no options
                |= caption
                |= stepEnd
            , P.succeed (\s -> ( [], Nothing, s ))
                -- no space, we directly hit stepEnd
                -- there is no caption,
                -- there are no options
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
    succeed identity
        |. Utils.colon
        |. Utils.spaces
        |= Utils.sentence


participant : Parser String
participant =
    Utils.word


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
        [ async
        ]



-- return : Parser Option
-- return =
--     succeed Return
--         |. keyword "return"
--         |. Utils.spaces1
--         |= Utils.doubleQuotes


async : Parser Option
async =
    succeed Async
        |. Utils.spaces
        |. keyword "async"
