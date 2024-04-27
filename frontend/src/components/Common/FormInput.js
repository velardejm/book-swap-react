export default function FormInput({label, type, name, onChangeHandler, autofocus, value}) {
    return (
        <div className="flex flex-col mb-5">
            <label>{label}</label>
            <input type={type} name={name} onChange={onChangeHandler} required autoFocus={autofocus} value={value}/>
        </div>
    )
}