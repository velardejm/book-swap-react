import SignUpP1 from "./SignUpP1";
import SignUpP2 from "./SignUpP2";
import { useState } from "react";
import { updateForm } from "../../utils/helpers";
// import useHandleModalEscape from "../../hooks/useHandleModalEscape";


export default function SignUpModal({ closeSignUpModal }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
    });

    const [signUpPage, setSignUpPage] = useState(1);

    // useHandleModalEscape(closeSignUpModal)

    const handleChange = (e) => {
        updateForm(e, setFormData);
    };

    const selectPage = () => {
        switch (signUpPage) {
            case 1:
                return <SignUpP1 formData={formData} setFormData={setFormData} handleChange={handleChange} setSignUpPage={setSignUpPage} />;
            case 2:
                return <SignUpP2 formData={formData} handleChange={handleChange} setSignUpPage={setSignUpPage} />;
        }
    }

    return (
        <div className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center">
            <div className="bg-green-100 px-10 py-10">
                <div>
                    <h1>Sign Up</h1>
                </div>

                {/* USE SWITCH CASE TO MOVE BETWEN SIGNUP PAGES */}
                {selectPage()}



            </div>
        </div>
    )
}