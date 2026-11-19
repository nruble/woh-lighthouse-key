import { Button } from "react-aria-components"
import '../styles/NewGameButton.scss'

interface ControlStateTerms {
  setSelectedGlyphs: React.Dispatch<React.SetStateAction<Set<string>>>
  setCharacter: React.Dispatch<React.SetStateAction<string>>
  setBackstory: React.Dispatch<React.SetStateAction<string>>
  setOldGod: React.Dispatch<React.SetStateAction<string>>
  setEnemyTextNote: React.Dispatch<React.SetStateAction<string>>
  setMysteryTextNote: React.Dispatch<React.SetStateAction<string>>
  setMobileDisplayNotes: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewGameButton({
  setMobileDisplayNotes, setSelectedGlyphs, setCharacter, setBackstory, setOldGod, setEnemyTextNote, setMysteryTextNote}
  :ControlStateTerms) {

  const resetNewGame = ()=> {
    setSelectedGlyphs(new Set())
    setCharacter('')
    setBackstory('')
    setOldGod('')
    setEnemyTextNote('')
    setMysteryTextNote('')
    setMobileDisplayNotes(false)
  }

  return (
    <div className="new-game-container">
      <Button
        className={'mobile-reset-newgame-button'}
        onPress={()=>{resetNewGame()}}
      >
        <span>NEW GAME</span>
      </Button>
    </div>
  )
}