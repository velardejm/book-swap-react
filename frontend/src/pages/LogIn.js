import FormInput from "./FormInput";
import { useState } from "react";

export default function LogIn() {
  const [formData, setFormData] = useState({
    username:''
    
  })

  const handleChange = (e) => {

  }
  
  const handleSubmit = (e) => {

  }

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 pb-10 mt-10">
      <h1 className="text-3xl font-bold py-10 text-center">Log In</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
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
        />
        <button
          className={`btn btn-primary w-28 self-center mt-2`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
