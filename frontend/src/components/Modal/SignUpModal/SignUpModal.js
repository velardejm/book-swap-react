import SignUpP1 from "./SignUpP1";
import SignUpP2 from "./SignUpP2";
import { useState } from "react";
import { updateForm } from "../../../utils/helpers";
// import useHandleModalEscape from "../../hooks/useHandleModalEscape";

export default function SignUpModal({ setIsSignUpModalOpen }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        userAndEmailAvailable: null
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

            <div className="bg-green-100 pb-10">
                <div>
                    <button onClick={() => setIsSignUpModalOpen(false)} className="block ml-auto mr-4 mt-2">x</button>
                </div>

                <div className="px-10">
                    <h1 className="text-center py-5 text-xl font-bold">Sign Up</h1>
                    {selectPage()}
                </div>
            </div>
        </div>
    )
}