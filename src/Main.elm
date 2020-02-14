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

import Editor exposing (Editor, EditorConfig, EditorMsg)
import Editor.Config exposing (WrapOption(..))
import Editor.Update as E
type Msg
    = InputChange String
    | ChangeAlwaysReturn Bool
    | ChangeIncludeTheme Bool
    | ShowExample
    | EditorMsg EditorMsg


type alias Model =
    { sequence : Result String Sequence
    , currentString : Maybe String
    , alwaysReturn : Bool
    , includeTheme : Bool
    , editor : Editor
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EditorMsg editorMsg ->
            let
                ( newEditor, editorCmd ) =
                    Editor.update editorMsg model.editor

                sourcetext = Just <| Editor.getSource newEditor
            in
                case editorMsg of 
                
                E.Insert str ->
                    updateEditor model newEditor editorCmd

                E.Unload str ->
                    syncWithEditor model newEditor editorCmd

                -- E.SendLine ->
                --     syncAndHighlightRenderedText (Editor.lineAtCursor newEditor) (editorCmd |> Cmd.map EditorMsg) { model | editor = newEditor }

                E.WrapAll ->
                    syncWithEditor model newEditor editorCmd

                E.Cut ->
                    syncWithEditor model newEditor editorCmd

                E.Paste ->
                    syncWithEditor model newEditor editorCmd

                E.Undo ->
                    syncWithEditor model newEditor editorCmd

                E.Redo ->
                    syncWithEditor model newEditor editorCmd

                E.RemoveGroupAfter ->
                    syncWithEditor model newEditor editorCmd

                E.RemoveGroupBefore ->
                    syncWithEditor model newEditor editorCmd

                E.Indent ->
                    syncWithEditor model newEditor editorCmd

                E.Deindent ->
                    syncWithEditor model newEditor editorCmd

                E.Clear ->
                    syncWithEditor model newEditor editorCmd

                E.WrapSelection ->
                    syncWithEditor model newEditor editorCmd
                _ -> 
                        ( { model | editor = newEditor, currentString = sourcetext }, Cmd.map EditorMsg editorCmd )

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

        ChangeIncludeTheme newVal ->
            ( { model | includeTheme = newVal }, Cmd.none )

        ShowExample ->
            let
                newEditor =
                    Editor.load DontWrap example model.editor
            in
            ( { model | currentString = Just example, sequence = parse example, editor = newEditor }, Cmd.none )


load : WrapOption -> String -> Model -> ( Model, Cmd Msg )
load wrapOption text model =
    let
        newEditor =
            Editor.load wrapOption text model.editor
    in
    ( { model | editor = newEditor }, Cmd.none )


updateEditor : Model -> Editor -> Cmd EditorMsg -> ( Model, Cmd Msg )
updateEditor model editor_ cmd_ =
    ( { model | editor = editor_ }, Cmd.map EditorMsg cmd_ )
    
syncWithEditor : Model -> Editor -> Cmd EditorMsg -> ( Model, Cmd Msg )
syncWithEditor model editor_ cmd_ =
    let
        text =
            Editor.getSource editor_
        
        newSequence =
                    parse text


    in
    ( { model
        | editor = editor_
        , sequence = newSequence
        , currentString = Just text
    
      }
    , Cmd.map EditorMsg cmd_
    )
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
                    [ Element.spacing 30
                    , Element.width (px 600)
                    , padding 20
                    , Background.color (Element.rgb 0.7 0.7 0.7)
                    , Font.color (Element.rgb 0.2 0.2 0.2)
                    , Element.alignTop
                    ]
                    [ intro
                    , githubLink
                    , exampleButton
                    , editor model
                    , showReturn model
                    , includeTheme model
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

    Element.el 
        [ Element.width (px <| Basics.round <| Editor.getWidth model.editor) 
        ] 
        ( Element.html <| Editor.embedded editorConfig model.editor )
            

    


    -- Input.multiline
    --     [ Element.height (px 600)
    --     , Background.color (Element.rgb 0.2 0.2 0.2)
    --     , Font.color (Element.rgb 0.9 0.9 0.9)
    --     ]
    --     { onChange = InputChange
    --     , text = Maybe.withDefault "" model.currentString
    --     , placeholder = Nothing
    --     , label = Input.labelAbove [] (text "Sequence Diagram")
    --     , spellcheck = False
    --     }


right : Model -> Element Msg
right model =
    case model.sequence of
        Err e ->
            Element.el [] (Element.text e)

        Ok seq ->
            Element.html <|
                Html.pre []
                    [ Html.text <| toPlantUml model.alwaysReturn model.includeTheme seq ]


intro : Element Msg
intro =
    Element.paragraph []
        [ text "This is a "
        , el [ Font.bold ] (text "PlantUML Sequence Diagram generator")
        , text ". Of course you can write them in PlantUML, but often i find i could use a much simpler way to express the sequence. So here it is."
        ]


githubLink : Element Msg
githubLink =
    Element.paragraph []
        [ text "This is all open source. Take a look at "
        , Element.link
            [ Font.color (Element.rgb 0 0 1)
            , Font.family
                [ Font.typeface "Monospace"
                , Font.sansSerif
                ]
            ]
            { url = "https://github.com/eelcoh/plantuml-generator"
            , label = text "the github repo."
            }
        ]


exampleButton : Element Msg
exampleButton =
    Element.el []
        (Input.button
            [ Border.color (Element.rgb 0 1 0)
            , Border.solid
            , Border.rounded 3
            , Background.color (Element.rgb 0.9 0.9 0.9)
            , Font.color (Element.rgb 0.9 0.2 0.2)
            , Element.spacing 5
            , Element.padding 5
            ]
            { onPress = Just ShowExample
            , label = text "Show an example!"
            }
        )


showReturn : Model -> Element Msg
showReturn model =
    Input.checkbox []
        { onChange = ChangeAlwaysReturn
        , icon = icon
        , checked = model.alwaysReturn
        , label = Input.labelAbove [] (text "Always show the return arrow")
        }


includeTheme : Model -> Element Msg
includeTheme model =
    Input.checkbox []
        { onChange = ChangeIncludeTheme
        , icon = icon
        , checked = model.includeTheme
        , label = Input.labelAbove [] (text "Include monochrome theme")
        }


icon : Bool -> Element msg
icon val =
    if val 
        then
            switchOffButton

        else
            switchOnButton


switchOnButton : Element msg
switchOnButton =
    Element.el
        [ Border.color (Element.rgb 0 1 0)
        , Border.solid
        , Border.rounded 3
        , Background.color (Element.rgb 0.9 0.9 0.9)
        , Font.color (Element.rgb 0.9 0.2 0.2)
        , Element.spacing 5
        , Element.padding 5
        ]
        (text "Switch on")


switchOffButton : Element msg
switchOffButton =
    Element.el
        [ Border.color (Element.rgb 0 1 0)
        , Border.solid
        , Border.rounded 3
        , Background.color (Element.rgb 0.9 0.9 0.9)
        , Font.color (Element.rgb 0.9 0.2 0.2)
        , Element.spacing 5
        , Element.padding 5
        ]
        (text "Switch off")


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

editorConfig : EditorConfig Msg
editorConfig =
    { editorMsg = EditorMsg
    , width = 500
    , height = 480
    , lineHeight = 16.0
    , showInfoPanel = True
    , wrapParams = { maximumWidth = 55, optimalWidth = 50, stringWidth = String.length }
    , wrapOption = DontWrap
    , fontProportion = 0.75
    , lineHeightFactor = 1.0
    }


example : String
example =
    """sequence user
    browser: click
        api: get this
            database: read this
        otherApi
    browser: enter changes
    browser: submit
        api: post that
            database: write that
    """


initModel : Model
initModel =
    { sequence = Err "no sequence yet"
    , currentString = Nothing
    , alwaysReturn = True
    , includeTheme = False
    , editor = Editor.init editorConfig ""
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
