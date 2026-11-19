import { useEffect } from 'react'
import './App.scss'
import { useLocalStorageState } from './hooks/useLocalStorage'
import styles from './styles/palette-names.module.scss'
import ControlPanel from './components/ControlPanel'
import Header from './components/Header'
import NoteDisplay from './components/NoteDisplay'
import NewGameButton from './components/NewGameButton'
import Footer from './components/Footer'

const PALETTE_NAMES:string[] = styles.names.split(/,\s*/)  // ["standard", "abyssal"]

// Serializing the glyphs to save because you can't stringify a Set.
const setOptions = {
  serialize: (vData: Set<string>) => JSON.stringify([...vData]),
  deserialize: (rawData: string) => new Set<string>(JSON.parse(rawData))
}

const setBoolStore = {
  serialize: (vData: boolean) => String(vData),
  deserialize: (rawData: string) => JSON.parse(rawData)
}

const themeOptions = {
  deserialize: (rawData:string) => {
    const vData = JSON.parse(rawData)
    if (!PALETTE_NAMES.includes(vData)) throw new Error('unknown theme')
    return vData as string
  }
}

export default function App() {
  // Local Storage states, so things are retained between visits, refreshes, etc.
  const [theme, setTheme] = useLocalStorageState<string>('theme', 'standard', themeOptions)
  const [selectedGlyphs, setSelectedGlyphs] = useLocalStorageState<Set<string>>('glyphs', new Set(), setOptions)
  const [character, setCharacter] = useLocalStorageState<string>('character', '')
  const [backstory, setBackstory] = useLocalStorageState<string>('backstory', '')
  const [oldGod, setOldGod] = useLocalStorageState<string>('oldGod', '')
  const [enemyTextNote, setEnemyTextNote] = useLocalStorageState<string>('enemytextnote', '')
  const [mysteryTextNote, setMysteryTextNote] = useLocalStorageState<string>('mystertextnote', '')
  const [mobileDisplayNotes, setMobileDisplayNotes] = useLocalStorageState<boolean>('mobiledisplaystate', false, setBoolStore)

  useEffect(()=>{
    document.documentElement.dataset.theme = theme
  },[theme])

  return (
    <>
      <Header
        theme={theme}
        setTheme={setTheme}
      />
      <main>
        <ControlPanel 
          selectedGlyphs={selectedGlyphs} 
          setSelectedGlyphs={setSelectedGlyphs} 
          character={character} 
          setCharacter={setCharacter} 
          backstory={backstory} 
          setBackstory={setBackstory} 
          oldGod={oldGod} 
          setOldGod={setOldGod}
          setEnemyTextNote={setEnemyTextNote}
          setMysteryTextNote={setMysteryTextNote}
          mobileDisplayNotes={mobileDisplayNotes}
          setMobileDisplayNotes={setMobileDisplayNotes}
          />
        <NoteDisplay 
          selectedGlyphs={selectedGlyphs} 
          character={character} 
          backstory={backstory} 
          oldGod={oldGod} 
          enemyTextNote={enemyTextNote}
          setEnemyTextNote={setEnemyTextNote}
          mysteryTextNote={mysteryTextNote}
          setMysteryTextNote={setMysteryTextNote}
          mobileDisplayNotes={mobileDisplayNotes}
        />
        {mobileDisplayNotes && 
          <NewGameButton 
            setMobileDisplayNotes={setMobileDisplayNotes}
            setSelectedGlyphs={setSelectedGlyphs}
            setCharacter={setCharacter}
            setBackstory={setBackstory}
            setOldGod={setOldGod}
            setEnemyTextNote={setEnemyTextNote}
            setMysteryTextNote={setMysteryTextNote} 
          />
        }
      </main>
      <Footer />
    </>
  )
}