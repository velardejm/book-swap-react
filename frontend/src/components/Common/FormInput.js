import { useState } from "react"

export default function FormInput({ label, type, name, onChangeHandler, autofocus, value, ref }) {
    const [inputValue, setInputValue] = useState(value);

    const updateInput = (e) => {
        onChangeHandler(e);
        setInputValue(e.target.value);
    }

    return (
        <div className="flex flex-col mb-5">
            <label>{label}</label>
            <input type={type} name={name} onChange={updateInput} required={true} autoFocus={autofocus} value={inputValue} ref={ref} />
        </div>
    )
}