
type InputTextProps = {
    inputName: string,
    inputValue: string,
    onInputChange: (name: string, value: string) => void,
    errorMessage: string,
};

function InputText({ inputName, inputValue, onInputChange, errorMessage }: InputTextProps) {
  return (   
    <div className="input-text-container">
      <input id="" name={inputName} type="text" placeholder="" value={inputValue} onChange={(e) => onInputChange(inputName, e.target.value)} />
      {
        errorMessage && (<span className="error-message">{errorMessage}</span>)
      }
    </div> 
  )
}

export default InputText