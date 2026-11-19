import rawData from '../data/character.json'
import '../styles/MemoArticles.scss'

interface CharacterInfo {
  name: string
  notes: {
    startBonus: string
    uniqueStatus: string
    prepItem: string
    other: string[]
  }
}

//type CharacterId = keyof typeof rawData
const data: Record<string, CharacterInfo> = rawData

function createOtherListItems(otherData:string[]) {
  return otherData.map((otherNote:string)=>{
    return <li>{otherNote}</li>
  })
}

export default function CharacterMemo({id}:{id: string}){
  const character:CharacterInfo = data[id]

  if (!character) return null // bailing out if character id not found

  return (
    <article className='memo-article memo-character'>
      <header>
        <p>CHARACTER</p>
        <h2>{character.name}</h2>
      </header>
      <dl>
        {character.notes.startBonus ? 
        <dt>{character.notes.startBonus}</dt> 
        : <></>}
        {character.notes.uniqueStatus ? 
        <>
        <dt><b>Unique Status:</b></dt> 
        <dd>{character.notes.uniqueStatus}</dd>
        </>
        : <></>}
        {character.notes.prepItem ? 
        <>
        <dt><b>Prepare Item:</b></dt>  
        <dd>{character.notes.prepItem}</dd>
        </>
        : <></>}
        {character.notes.other.length > 0 ? 
        createOtherListItems(character.notes.other)
        : <></>}
      </dl>
    </article>
  )
}