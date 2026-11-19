import '../styles/ControlPanel.scss'
import lighthouseGlyphs from '../data/lighthouseglyphs.json'
import characters from '../data/character.json'
import backstories from '../data/backstory.json'
import oldgods from '../data/oldgods.json'
import type { Key } from 'react'
import { ToggleButton, ToggleButtonGroup, Separator, Button } from 'react-aria-components'

type GlyphData = {
  name: string,
  description: string,
  iconUrl: string,
  type: string
}
interface ControlStateTerms {
  selectedGlyphs: Set<string>
  setSelectedGlyphs: React.Dispatch<React.SetStateAction<Set<string>>>
  character: string
  setCharacter: React.Dispatch<React.SetStateAction<string>>
  backstory: string
  setBackstory: React.Dispatch<React.SetStateAction<string>>
  oldGod: string
  setOldGod: React.Dispatch<React.SetStateAction<string>>
  setEnemyTextNote: React.Dispatch<React.SetStateAction<string>>
  setMysteryTextNote: React.Dispatch<React.SetStateAction<string>>
  mobileDisplayNotes:boolean
  setMobileDisplayNotes: React.Dispatch<React.SetStateAction<boolean>>
}

function createGlyphButtons(glyphDataSet:Array<GlyphData>, selectedGlyphs:Set<string>) {
  const glyphsAtMax = selectedGlyphs.size >= 6

  return glyphDataSet.map((glyph:GlyphData)=>{
    return (
      <ToggleButton 
        className={`control-panel-glyph-button`}
        key={glyph.name}
        id={glyph.name}
        isDisabled={glyphsAtMax && !selectedGlyphs.has(glyph.name)}
      >
        <span
          className={`control-panel-glyph-img`}
          role={"img"}
          aria-label={glyph.description}
          style={{mask: `url(${glyph.iconUrl}) center / 48px 48px no-repeat`}}
        />
      </ToggleButton>  
    )
  })
}

function createSelectOptions(selectionDataset:Object) {
  return Object.entries(selectionDataset).map((instance, index)=>{
      return <option value={instance[0]} id={instance[0]} key={`${instance[0]}${index}`} className="control-panel-select-option">{instance[1].name}</option>
    })
}

export default function ControlPanel({
  selectedGlyphs, setSelectedGlyphs, 
  character, setCharacter, 
  backstory, setBackstory, 
  oldGod, setOldGod, 
  setEnemyTextNote, 
  setMysteryTextNote, 
  mobileDisplayNotes,
  setMobileDisplayNotes
}:ControlStateTerms) {
  const updateCharacter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacter(event.target.value)
  }
  const updateBackstory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBackstory(event.target.value)
  }
  const updateOldGod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOldGod(event.target.value)
  }
  const resetControlOptions = () => {
    setSelectedGlyphs(new Set())
    setCharacter('')
    setBackstory('')
    setOldGod('')
    setEnemyTextNote('')
    setMysteryTextNote('')
    setMobileDisplayNotes(false)
  }

  const continueForMobile = () => {
    setMobileDisplayNotes(true)
  }

  const updateGlyphs = (keys:Set<Key>)=> {
    const stringOfKeys = new Set(Array.from(keys, (key) => String(key)))
    setSelectedGlyphs(stringOfKeys)
  }

  return (
    <menu className={`control-panel-container`}>
      <span className='control-panel-gradient'></span>
      <div className={`control-panel-inner-wrap${mobileDisplayNotes ? ' collapse' : ''}`}>
        <p>This is an assistive planner for WORLD OF HORROR. Match your settings to generate a Lighthouse event requirement to-do list and other helpful notes.</p>
        <section className='control-panel-main'>
          <h1>Lighthouse Door Glyphs</h1>
          <ToggleButtonGroup 
            className='control-panel-glyph-grid'
            selectionMode='multiple'
            selectedKeys={selectedGlyphs}
            onSelectionChange={updateGlyphs}
          >
            {createGlyphButtons(lighthouseGlyphs, selectedGlyphs)}
          </ToggleButtonGroup>
        </section>

        <Separator className='control-panel-divider'/>

        <section className='control-panel-second'>
          <p>For more assistance, match any of these to your run:</p>
          <select
            aria-label='Select your CHARACTER'
            id="characterSelect"
            name="Select your CHARACTER"
            value={character ?? ''}
            onChange={updateCharacter}
            className='control-panel-select'
          >
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <option value="" disabled className="control-panel-select-option">Select your CHARACTER</option>
            {createSelectOptions(characters)}
          </select>

          <select
            aria-label='Select your BACKSTORY'
            id="backstorySelect"
            name="Select your BACKSTORY"
            value={backstory ?? ''}
            onChange={updateBackstory}
            className='control-panel-select'
          >
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <option value="" disabled className="control-panel-select-option">Select your BACKSTORY</option>
            {createSelectOptions(backstories)}
          </select>

          <select
            aria-label='Select your OLD GOD'
            id="oldgodSelect"
            name="Select your OLD GOD"
            value={oldGod ?? ''}
            onChange={updateOldGod}
            className='control-panel-select'
          >
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <option value="" disabled className="control-panel-select-option">Select your OLD GOD</option>
            {createSelectOptions(oldgods)}
          </select>
        </section>

        <section className='control-panel-extras'>
          <Button
            className={'control-panel-reset-button'}
            onPress={()=>{resetControlOptions()}}
          >
            <span>RESET</span>
          </Button>
          <Button
            className={'control-panel-continue-button'}
            onPress={()=>{continueForMobile()}}
          >
            <span>CONTINUE</span>
          </Button>
        </section>
      </div>
    </menu>
  )
}