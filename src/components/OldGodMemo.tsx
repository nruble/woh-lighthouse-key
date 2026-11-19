import rawData from '../data/oldgods.json'
import '../styles/MemoArticles.scss'

interface OldGodInfo {
  name: string
  shortname: string
  notes: {
    startBonus?: string
    rule: string
    ruledetaillist?: string[]
    events?: EventData[]
  }
}

interface EventData {
  name: string
  choices: string[]
}

//type CharacterId = keyof typeof rawData
const data: Record<string, OldGodInfo> = rawData

function createOtherListItems(otherData:string[]) {
  return otherData.map((otherNote:string)=>{
    return <dd>{otherNote}</dd>
  })
}

function createEventListItem(eventData:EventData[]) {
  return eventData.map((thisEvent)=> {
    return (
    <>
      <dt>{`[${thisEvent.name.toLocaleUpperCase()}]`}</dt>
      {thisEvent.choices.map((thisChoice)=>{
        return <dd>{thisChoice}</dd>
      })}
    </>)
  })
}

export default function OldGodMemo({id}:{id: string}){
  const oldGod:OldGodInfo = data[id]

  if (!oldGod) return null // bailing out if old god id not found

  return (
    <article className='memo-article memo-oldgod'>
      <header>
        <p>OLD GOD</p>
        <h2>{oldGod.shortname}</h2>
      </header>
      <dl>
        {oldGod.notes.startBonus ? 
        <dt>{oldGod.notes.startBonus}</dt> 
        : <></>}
        {oldGod.notes.rule ? 
        <dt><b>Rule:</b> {oldGod.notes.rule}</dt> 
        : <></>}
        {oldGod.notes.ruledetaillist && oldGod.notes.ruledetaillist.length > 0 ? 
        createOtherListItems(oldGod.notes.ruledetaillist)
        : <></>}
        {oldGod.notes.events ?
        <>
        <dt><b>Unique Events:</b></dt>
        {createEventListItem(oldGod.notes.events)}
        </> 
        : <></>}
      </dl>
    </article>
  )
}