import FormInput from "../Common/FormInput";

export default function SignUpP1({formData, handleChange}) {
    return (
        <div>
            <form>
                <FormInput
                    label="Username:"
                    type="text"
                    name="username"
                    onChangeHandler={handleChange}
                    autofocus={true}
                />

                <FormInput
                    label="Password:"
                    type="password"
                    name="password"
                    onChangeHandler={handleChange}
                    autofocus={false}
                />

                <button
                    className={`btn bg-blue-500 w-28 self-center mt-2`}
                    type="submit"
                >
                    Log in
                </button>
            </form>
        </div>
    )
}