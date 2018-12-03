module SequenceDiagram.Model exposing (ParticipantName, Sequence(..), Step(..), Option(..))

{-|


# Types

@docs ParticipantName, Sequence, Step, Option

-}


{-| Alias for string
-}
type alias ParticipantName =
    String


{-| Sequence object, a participant name and a list of steps
-}
type Sequence
    = Sequence ParticipantName (List Step)


{-| A single step contains
\* Optionally a caption for the step
\* A list of Options (may be empty)
\* A list of child Steps (may be empty)
-}
type Step
    = Step ParticipantName (List Option) (Maybe String) (List Step)



-- | Return (Maybe String)
--  | Note String (Maybe Over)
-- type Over
--     = Tuple ParticipantName ParticipantName


{-| Options for steps
\* A Return caption
\* Async to denote that it won't have a Return
-}
type Option
    = Async
