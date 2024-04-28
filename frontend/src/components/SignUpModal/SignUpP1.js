import FormInput from "../Common/FormInput";

export default function SignUpP1({ formData, setFormData, handleChange, setSignUpPage }) {
    const { name, username, email } = formData

    const checkIsValid = async (username, email) => {
        // Request to check if username or email already exists

        const response = await fetch('http://localhost:3001/account/signup/1', {
            method: 'GET',
        });

        if (response.status === 200) {
            setFormData((prev) => {
                return {
                    ...prev,
                    userAndEmailAvailable: true
                }
            });
            console.log(formData);
            setSignUpPage(2);
        } else {
            alert("Username or Email already exists");
            setFormData((prev) => {
                return {
                    ...prev,
                    username: '',
                    email: '',
                    userAndEmailAvailable: false
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
                    onClick={() => checkIsValid(username, email)}
                >
                    Next
                </button>
            </form>
        </div>
    )
}