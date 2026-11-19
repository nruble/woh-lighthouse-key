import rawData from '../data/backstory.json'
import '../styles/MemoArticles.scss'

interface BackstoryInfo {
  name: string
  notes: {
    other: string[]
  }
}

//type BackstoryId = keyof typeof rawData
const data: Record<string, BackstoryInfo> = rawData

function createOtherListItems(otherData:string[]) {
  return otherData.map((otherNote:string)=>{
    return <dt>{otherNote}</dt>
  })
}

export default function BackstoryMemo({id}:{id: string}){
  const backstory:BackstoryInfo = data[id]

  if (!backstory) return null // bailing out if backstory id not found

  return (
    <article className='memo-article memo-backstory'>
      <header>
        <p>BACKSTORY</p>
        <h2>{backstory.name}</h2>
      </header>
      <dl>
        {backstory.notes.other.length > 0 ? 
        createOtherListItems(backstory.notes.other)
        : <></>}
      </dl>
    </article>
  )
}