module SequenceDiagram.Renderer exposing (toPlantUml)

import SequenceDiagram.Model exposing (..)


toPlantUml : Bool -> Sequence -> String
toPlantUml showReturn (Sequence name steps) =
    let
        steps_ =
            List.map (writeStep showReturn name) steps
                |> List.concat

        body =
            session name steps_
    in
    [ "@startuml\n\n" ]
        ++ skinparam
        ++ body
        ++ [ "@enduml\n" ]
        |> String.concat


session participant_ stepLines_ =
    let
        activate p =
            "activate "
                ++ p
                |> withEol

        deactivate p =
            "deactivate "
                ++ p
                |> withEol
                |> withEol
    in
    activate participant_
        :: (withIndent stepLines_ ++ [ deactivate participant_ ])


writeStep : Bool -> String -> Step -> List String
writeStep showReturn pFrom (Step pTo mCaption options steps) =
    let
        to =
            " -> "

        stepLine_ =
            pFrom
                ++ to
                ++ pTo
                ++ ":"
                ++ writeMaybeCaption mCaption
                |> withEol
                |> withEol

        stepLines_ =
            List.map (writeStep showReturn pTo) steps
                |> List.concat
                |> (\a -> List.append a returnLines_)

        -- |> List.map indent
        returnLines_ =
            returnTo showReturn pTo pFrom
                |> Maybe.map (\a -> [ a ])
                |> Maybe.withDefault []

        -- lines_ =
        --     activate pTo
        --         :: (stepLines_ ++ [ deactivate pTo ])
        -- |> List.map indent
    in
    stepLine_
        :: session pTo stepLines_
        |> Debug.log "indented"


withIndent =
    let
        indent s =
            "    " ++ s
    in
    List.map indent


returnTo showReturn p1 p2 =
    if showReturn then
        Just <| returnLine p1 p2

    else
        Nothing


returnLine p1 p2 =
    p1
        ++ " --> "
        ++ p2
        |> withEol


writeMaybeCaption : Maybe String -> String
writeMaybeCaption mCaption =
    let
        mkCaption c =
            " " ++ c
    in
    Maybe.map mkCaption mCaption
        |> Maybe.withDefault ""


withEol : String -> String
withEol str =
    str ++ "\n"


skinparam =
    """skinparam shadowing false

skinparam sequence {

    ArrowColor #515151
    ActorBorderColor #515151
    LifeLineBorderColor #515151
    LifeLineBackgroundColor #ddd
    
    ParticipantBorderColor #515151
    ParticipantBackgroundColor white
    ParticipantFontName Arial
    ParticipantFontSize 17
    ParticipantFontColor #515151
    
    ActorBackgroundColor white
    ActorFontColor DeepSkyBlue
    ActorFontSize 17
    ActorFontName Aapex
}
    """
        |> withEol
        |> String.lines
        |> List.map withEol
