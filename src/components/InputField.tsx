interface InputProps {
    label: string;
    type: string;
    value: string;
    setInputValue: (newValue: string) => void;
    placeholder?: string;
    errorState: boolean;
    errorMessage?: string;
    handleBlur: () => void;
}

const InputField: React.FC<InputProps> = ({
    label, type, value, setInputValue, placeholder = "",
    errorState = false, errorMessage = "",
    handleBlur
}) => {
    return (
        <div className='input_container'>
            <label htmlFor={label} className='label'>{label}</label>
            <div>
                <input
                    id={label}
                    name={label}
                    placeholder={placeholder}
                    type={type} value={value}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='custom-input'
                    onBlur={handleBlur}
                />
            </div>
            {
                errorState && <p className="error">{errorMessage}</p>
            }
        </div>
    )
}

export default InputField