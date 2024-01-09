export default function FormInput({label, type, name, onChangeHandler, autofocus}) {
    return (
        <div className="flex flex-col mb-5">
            <label>{label}</label>
            <input type={type} name={name} onChange={onChangeHandler} required autoFocus={autofocus}/>
        </div>
    )
}