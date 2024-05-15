import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';

export default function HeaderLinks({ ...props }) {
  const {
    isLoggedIn,
    setisLogOutPromptOpen,
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
  } = props;
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex">
        {/* {isLoggedIn && (
          <>
            <Button
              label={'Log Out'}
              className={'btn bg-red-400 mx-2 py-3'}
              onClick={() => setisLogOutPromptOpen(true)}
            />

            <Button
              label={'To Dashboard'}
              className={'btn bg-blue-400 mx-2'}
              onClick={() => navigate('/user')}
            />

            <Button
              label={'To Listings'}
              className={'btn bg-blue-400 mx-2'}
              onClick={() => navigate('/books/listings')}
            />
          </>
        )} */}

        {!isLoggedIn && (
          <>
            <Button
              label={'Log in'}
              className={'btn bg-blue-500 mx-2 h-6'}
              onClick={() => setIsLoginModalOpen(true)}
            />

            <Button
              label={'Sign up'}
              className={'btn bg-blue-500  h-6'}
              onClick={() => setIsSignUpModalOpen(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
