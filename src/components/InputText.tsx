

function InputText({ inputValue, onInputChange }) {
  return (
    
        <input id="" type="text" placeholder="" value={inputValue} onChange={(e) => onInputChange(e.target.value)} />
    
  )
}

export default InputText