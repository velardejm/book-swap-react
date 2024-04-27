import FormInput from "../Common/FormInput";

export default function SignUpP2({ formData, handleChange, setSignUpPage }) {
    return (
        <div>
            <form>


                <FormInput
                    label="Password:"
                    type="password"
                    name="password"
                    onChangeHandler={handleChange}
                    autofocus={false}
                />

                <FormInput
                    label="Password Confirmation:"
                    type="password"
                    name="passwordConfirmation"
                    onChangeHandler={handleChange}
                    autofocus={false}
                />

                <button
                    className={`btn bg-blue-500 w-28 self-center mt-2`}
                    type="button"
                    onClick={() => setSignUpPage(1)}
                >
                    Back
                </button>

                <button
                    className={`btn bg-blue-500 w-28 self-center mt-2`}
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}