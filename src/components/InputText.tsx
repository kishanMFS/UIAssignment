
type InputTextProps = {
    inputValue: string,
    onInputChange: (value: string) => void,
    errorMessage: string,
};

function InputText({ inputValue, onInputChange, errorMessage }: InputTextProps) {
  return (   
    <div className="input-text-container">
      <input id="" type="text" placeholder="" value={inputValue} onChange={(e) => onInputChange(e.target.value)} />
      {
        errorMessage && (<span className="error-message">{errorMessage}</span>)
      }
    </div> 
  )
}

export default InputText