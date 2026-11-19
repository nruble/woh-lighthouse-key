import { useMemo } from 'react'
import '../styles/NoteDisplay.scss'
import WriteInput from './WriteInput'
import CharacterMemo from './CharacterMemo'
import BackstoryMemo from './BackstoryMemo'
import OldGodMemo from './OldGodMemo'

const STAT_GLYPHS = new Set(['formula', 'blades', 'snare', 'ward', 'tribute'])

export default function NoteDisplay({selectedGlyphs, character, backstory, oldGod, enemyTextNote, setEnemyTextNote, mysteryTextNote, setMysteryTextNote, mobileDisplayNotes}
  :{selectedGlyphs:Set<string>, character:string, backstory:string, oldGod:string, enemyTextNote:string, setEnemyTextNote: React.Dispatch<React.SetStateAction<string>>, mysteryTextNote:string, setMysteryTextNote: React.Dispatch<React.SetStateAction<string>>, mobileDisplayNotes:boolean}) {
  const statCheckNotes = useMemo(()=> {
    return [...STAT_GLYPHS].some((glyph)=> selectedGlyphs.has(glyph)) ?
      <div className='stat-note-block'>
        <p><b>Raise these stats to 8 or more to pass checks:</b></p>
        <ul>
          {selectedGlyphs.has('formula') ? <li>[STR] Strength</li> : <></>}
          {selectedGlyphs.has('blades') ? <li>[DEX] Dexterity</li> : <></>}
          {selectedGlyphs.has('snare') ? <li>[PER] Perception</li> : <></>}
          {selectedGlyphs.has('ward') ? <li>[KNW] Knowledge</li> : <></>}
          {selectedGlyphs.has('tribute') ? <li>[CHR] Charisma</li> : <></>}
        </ul>
      </div>
    : <></>
  },[STAT_GLYPHS, selectedGlyphs])

  const fightNote = useMemo(()=> {
    return selectedGlyphs.has('sigil') ? 
    <p><b>Prepare to fight a HUMAN enemy.</b></p>
    : <></>
  },[selectedGlyphs])

  const lightSourceNote = useMemo(()=> {
    return selectedGlyphs.has('shroud') ? 
    <p>Acquire a <b>FLASHLIGHT</b>, <b>TORCH</b>, or <b>HEAVY DUTY FLASHLIGHT</b> and have it with you.</p>
    : <></>
  },[selectedGlyphs])

  const secondEnemyNote = useMemo(()=> {
    return selectedGlyphs.has('memento') ?
    <div className='enemy-note'>
      <p>Remember the <b>2nd Enemy</b> you encounter:</p>
      <WriteInput placeholderText={"Write the name of the ENEMY"} name={'enemy'} stateBasis={enemyTextNote} noteSetter={setEnemyTextNote} />
    </div>
    : <></>
  },[selectedGlyphs, enemyTextNote])

  const secondMysteryNote = useMemo(()=> {
    return selectedGlyphs.has('choice') ?
    <div className='mystery-note'>
      <p>Remember the <b>2nd Mystery</b> you solved:</p>
      <WriteInput placeholderText={"Write the name of the MYSTERY"} name={'mystery'} stateBasis={mysteryTextNote} noteSetter={setMysteryTextNote}/>
    </div>
    : <></>
  },[selectedGlyphs, mysteryTextNote])


  return (
    <section className={`card-display-container${mobileDisplayNotes ? ' show-for-mobile': ''}`}>
      <div className='glyph-card-container'>
      {
        selectedGlyphs.size > 0 ?
        <section className='card-1'>
          <div className='card-1-head'></div>
          <div className='card-1-body'>
            <div className='card-1-body-inner'>
              <h1>TO-DO LIST:</h1>
              {statCheckNotes}
              {fightNote}
              {lightSourceNote}
              {secondEnemyNote}
              {secondMysteryNote}
            </div>
          </div>
          <div className='card-1-foot'></div>
        </section>
        : <></>
      }
      </div>
      <section className="full-settings-card-container">
        {
          !(!character && !backstory && !oldGod) ?
          <>
            {
              character && 
              <section
              className='card-2'
              >
                <div className='card-2-head'></div>
                <div className='card-2-body'>
                  <CharacterMemo id={character} />
                </div>
                <div className='card-2-foot'></div>
              </section>
            }
            {backstory && 
              <section
              className='card-2'
              >
                <div className='card-2-head'></div>
                <div className='card-2-body'>
                  <BackstoryMemo id={backstory} />
                </div>
                <div className='card-2-foot'></div>
              </section>
            }
            {oldGod && 
              <section
              className='card-2'
              >
                <div className='card-2-head'></div>
                <div className='card-2-body'>
                  <OldGodMemo id={oldGod} />
                </div>
                <div className='card-2-foot'></div>
              </section>
            }
          </>
          : <section className='card-2-placeholder'></section>
        }
      </section>
    </section>
  )
}