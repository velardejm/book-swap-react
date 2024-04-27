import SignUpP1 from "./SignUpP1";


import { useState } from "react";
import { updateForm } from "../../utils/helpers";
import SignUp from "../Auth/SignUp";

export default function SignUpModal() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleChange = (e) => {
        updateForm(e, setFormData);
    };

    return (
        <div className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center">
            <div className="bg-green-100 px-10 py-10">
                <div>
                    <h1>Sign Up</h1>
                </div>

                {/* USE SWITCH CASE TO MOVE BETWEN SIGNUP PAGES */}

                <SignUpP1 formData={formData} handleChange={handleChange} />


            </div>
        </div>
    )
}