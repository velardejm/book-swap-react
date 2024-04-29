import FormInput from "../Common/FormInput";
import { useState, useEffect, useRef } from "react";

export default function SignUpP1({ formData, setFormData, handleChange, setSignUpPage }) {
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const { name, username, email } = formData;

    useEffect(() => {
        if(name && username && email) {
            setIsNextEnabled(true);
        } else {
            setIsNextEnabled(false);
        }
    }, [formData])

    const isEmailOrUsernameTaken = async () => {
        if(!isEmailValid()) {
            alert('Invalid email.');

            return;
        }


        const response = await fetch('http://localhost:3001/account/signup/1', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData),
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
            const responseObject = await response.json();
            alert(responseObject.errorMessage);
            setFormData((prev) => {
                return {
                    ...prev,
                    userAndEmailAvailable: false
                }
            });
            // Autofocus on username form input (using ref?)
        }

    }

    const isEmailValid = () => {
        const emailInput = document.querySelector('input[type="email"]');
        emailInput.focus();
        return emailInput.validity.valid;
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
                    autofocus={false}
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
                    className={`btn bg-blue-500 w-28 self-center mt-2 ${isNextEnabled? '' : 'bg-gray-500'}`}
                    type="button"
                    onClick={() => isEmailOrUsernameTaken()}
                    disabled={!isNextEnabled}
                >
                    {/* TODO: ADD SUBMIT ON ENTER */}
                    Next
                </button>
            </form>
        </div>
    )
}