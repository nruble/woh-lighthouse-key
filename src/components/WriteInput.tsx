
export default function WriteInput({placeholderText, name, stateBasis, noteSetter}:{placeholderText:string, name:string, stateBasis:string, noteSetter: React.Dispatch<React.SetStateAction<string>>}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
    noteSetter(event.target.value)
  }

  return (
    <input 
      aria-label={placeholderText}
      name={name}
      type="text"
      value={stateBasis}
      onChange={handleChange}
      placeholder={placeholderText}
    />
    )
}