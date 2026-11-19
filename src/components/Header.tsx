import '../styles/Header.scss'
import { SheetTrigger, Button } from 'react-aria-components'
import PaletteSheet from './PaletteSheet'

export default function Header({theme, setTheme}: {theme:string, setTheme:React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <header className='site-header'>
      <div className="site-logo">
        <div className='site-logo-icon'>
          <span
            role={"img"}
            aria-label='Lighthouse Key logo'
          />
        </div>
        <div className="site-logo-text">
          <span className="site-logo-text-main">Lighthouse Key</span>
          <span className="site-logo-text-sub">World of Horror Planner</span>
        </div>
      </div>
      <SheetTrigger>
        <Button className={"palette-swap-button"} aria-label='Palette Selection'>
          <div className='palette-button-grid'>
            <span className='palette-button-swatch-1'></span>
            <span className='palette-button-swatch-2'></span>
            <span className='palette-button-swatch-3'></span>
            <span className='palette-button-swatch-4'></span>
          </div>
        </Button>
        <PaletteSheet 
          theme={theme}
          setTheme={setTheme}
        />
      </SheetTrigger>
    </header>
  )
}
