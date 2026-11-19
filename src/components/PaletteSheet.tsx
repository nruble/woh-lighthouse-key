import '../styles/PaletteSheet.scss'
import { useMemo } from 'react'
import { SheetOverlay, SheetBackdrop, Sheet, SheetContent, Button } from 'react-aria-components'
import styles from '../styles/palette-names.module.scss'

const PALETTE_NAMES:string[] = styles.names.split(/,\s*/)  // ["standard", "abyssal"]
const PALETTES = PALETTE_NAMES.map((id) => ({
  id,
  label: styles[id]
}))

export default function PaletteSheet({theme, setTheme}: {theme:string, setTheme:React.Dispatch<React.SetStateAction<string>>}) {
  const paletteButtons = useMemo(()=>{
    return (
      PALETTES.map(({id, label})=>{
        return (
          <Button
            key={id}
            className={`palette-button${id == theme ? ' active' : ''}`}
            onPress={()=> setTheme(id)}
            data-theme={id}
          >
            <div className='palette-button-swatch' aria-hidden="true" data-theme={id}>
              <span className='palette-button-swatch-1'></span>
              <span className='palette-button-swatch-2'></span>
              <span className='palette-button-swatch-3'></span>
              <span className='palette-button-swatch-4'></span>
            </div>
            <label className='palette-button-names'>
              <p className='palette-button-names-safety' data-theme={`standard`}>{`${label}`}</p>
              <p className='palette-button-names-theme' aria-hidden="true" data-theme={id}>{`${label}`}</p>
            </label>
          </Button>
        )
      })
    )
  }, [PALETTES, theme])

  return (
    <SheetOverlay className={"palette-sheet-overlay"}>
      <SheetBackdrop className={"palette-sheet-backdrop"} />
      <Sheet className={"palette-sheet-modal"}>
        <SheetContent className={"palette-sheet-content"}>
          <p className='palette-warning'>All color palettes are sourced from the original game. Many do not meet WCAG accessibility standards for color contrast to maintain text legibility. Use of alternate palettes is done at your own discretion.</p>
          <section className='palette-button-group'>
            {paletteButtons}
          </section>
        </SheetContent>
      </Sheet>
    </SheetOverlay>
  )
  
}