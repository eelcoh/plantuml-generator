module Main exposing (main)

import Browser
import Element exposing (Element, alignRight, centerY, column, el, fill, padding, px, rgb255, row, spacing, text, width)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html as Html
import Json.Decode as Decode exposing (Value)
import SequenceDiagram.Model exposing (Sequence)
import SequenceDiagram.Parser exposing (parse)
import SequenceDiagram.Renderer exposing (toPlantUml)


type Msg
    = InputChange String
    | ChangeAlwaysReturn Bool


type alias Model =
    { sequence : Result String Sequence
    , currentString : Maybe String
    , alwaysReturn : Bool
    }


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        InputChange str ->
            let
                newSequence =
                    parse str

                newModel =
                    { model
                        | sequence = newSequence
                        , currentString = Just str
                    }
            in
            ( newModel, Cmd.none )

        ChangeAlwaysReturn newVal ->
            ( { model | alwaysReturn = newVal }, Cmd.none )


document : Model -> Browser.Document Msg
document model =
    { title = "platUml sequence diagram generator"
    , body = view model
    }


view : Model -> List (Html.Html Msg)
view model =
    List.singleton <|
        Element.layout [] <|
            row [ Element.spacing 20, Element.alignTop ]
                [ column
                    [ Element.spacing 20
                    , padding 20
                    , Background.color (Element.rgb 0.7 0.7 0.7)
                    , Font.color (Element.rgb 0.2 0.2 0.2)
                    ]
                    [ editor model
                    , showReturn model
                    ]
                , column
                    [ Element.spacing 20
                    , padding 20
                    , Element.alignTop
                    , Background.color (Element.rgb 0.9 0.9 0.9)
                    , Font.color (Element.rgb 0.2 0.2 0.2)
                    ]
                    [ right model
                    ]
                ]


editor : Model -> Element Msg
editor model =
    Input.multiline
        [ Element.height (px 400)
        , Background.color (Element.rgb 0.2 0.2 0.2)
        , Font.color (Element.rgb 0.9 0.9 0.9)
        ]
        { onChange = InputChange
        , text = Maybe.withDefault "" model.currentString
        , placeholder = Nothing
        , label = Input.labelAbove [] (text "Sequence Diagram")
        , spellcheck = False
        }


right : Model -> Element Msg
right model =
    case model.sequence of
        Err e ->
            Element.el [] (Element.text e)

        Ok seq ->
            Element.html <|
                Html.pre []
                    [ Html.text <| toPlantUml model.alwaysReturn seq ]


showReturn : Model -> Element Msg
showReturn model =
    Input.checkbox []
        { onChange = ChangeAlwaysReturn
        , icon = showReturnIcon
        , checked = model.alwaysReturn
        , label = Input.labelAbove [] (text "Always show the return arrow")
        }


showReturnIcon : Bool -> Element msg
showReturnIcon val =
    case val of
        True ->
            Element.text "show"

        False ->
            Element.text "don't show"


myRowOfStuff : Element msg
myRowOfStuff =
    row [ width fill, centerY, spacing 30 ]
        [ myElement
        , myElement
        , el [ alignRight ] myElement
        ]


myElement : Element msg
myElement =
    el
        [ Background.color (rgb255 240 0 245)
        , Font.color (rgb255 255 255 255)
        , Border.rounded 3
        , padding 30
        ]
        (text "stylish!")


init : Value -> ( Model, Cmd Msg )
init _ =
    ( initModel, Cmd.none )


initModel : Model
initModel =
    { sequence = Err "no sequence yet"
    , currentString = Nothing
    , alwaysReturn = False
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program Value Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view = document
        , subscriptions = subscriptions
        }
