import FormInput from "../Common/FormInput";

export default function SignUpP1({ formData, setFormData, handleChange, setSignUpPage }) {
    const { name, username, email } = formData

    const checkIsValid = () => {
        // Request to check if username or email already exists
        const isValid = false;

        if (isValid) {
            setSignUpPage(2)
        } else {
            alert("Username or Email already exists");
            setFormData((prev) => {
                return {
                    ...prev,
                    username: '',
                    email: ''
                }
            });
            // Autofocus on username form input (using ref?)

        }

    }

    return (
        <div>
            <form>
                <FormInput
                    label="Name:"
                    type="text"
                    name="name"
                    onChangeHandler={handleChange}
                    autofocus={true}
                    value={name}
                />

                <FormInput
                    label="Username:"
                    type="text"
                    name="username"
                    onChangeHandler={handleChange}
                    autofocus={true}
                    value={username}
                />

                <FormInput
                    label="Email:"
                    type="email"
                    name="email"
                    onChangeHandler={handleChange}
                    autofocus={false}
                    value={email}
                />

                <button
                    className={`btn bg-blue-500 w-28 self-center mt-2`}
                    type="button"
                    onClick={() => checkIsValid()}
                >
                    Next
                </button>
            </form>
        </div>
    )
}