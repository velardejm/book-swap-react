import FormInput from "./FormInput"

export default function Form({ handleChange, handleSubmit, formFields }) {
    return (
        <form method="post" className="flex flex-col" onSubmit={handleSubmit}>

            {formFields.map((input, index) => {
                return (
                    <FormInput
                        key={index}
                        label={input.label}
                        type={input.type}
                        name={input.name}
                        onChangeHandler={handleChange}
                        autofocus={input.autofocus}
                    />
                )
            })}

            <button
                className={`btn btn-primary w-28 self-center mt-2`}
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}