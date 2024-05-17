import { useState, useContext } from 'react';
import { updateForm } from '../../utils/helpers';
import FormInput from '../Common/FormInput';
import useGetPreviousRoute from '../../hooks/useGetPreviousRoute';
// import useLogin from '../../hooks/useLogin';
import useHandleModalEscape from '../../hooks/useHandleModalEscape';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginModal({ setIsLoginModalOpen }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [from, navigate] = useGetPreviousRoute();

  const { logIn, setIsLoggedIn } = useContext(AuthContext);

  useHandleModalEscape(() => setIsLoginModalOpen(false));

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoginSuccessful = await logIn(formData);
    if (isLoginSuccessful) {
      navigate(from);
    }
  };

  return (
    <div
      id="parent-div"
      onClick={(e) => {
        if (e.target.id === 'parent-div') {
          // setIsLoginModalOpen(false);
        }
      }}
      className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center"
    >
      <div>
        <div className="bg-slate-50 pb-10 rounded-md">
          <div>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="block ml-auto mr-4 mt-2"
            >
              x
            </button>
          </div>

          <div className="px-10">
            <h1 className="text-center py-5 text-xl font-bold">Log In</h1>
            <form
              method="post"
              className="flex flex-col"
              onSubmit={handleSubmit}
            >
              <FormInput
                label="Username:"
                type="text"
                name="username"
                onChangeHandler={handleChange}
                autofocus={true}
                data={formData.username}
              />

              <FormInput
                label="Password:"
                type="password"
                name="password"
                onChangeHandler={handleChange}
                autofocus={false}
                data={formData.password}
              />

              <button
                className={`btn bg-blue-500 w-28 self-center mt-2`}
                type="submit"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
