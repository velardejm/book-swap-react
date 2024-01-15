const useSignUp = () => {
    const signUp = async (formData) => {
        try {
            const { password, passwordConfirmation } = formData;
            if (password !== passwordConfirmation) {
                alert('Incorrect password verification.');
            } else {
                const response = await fetch('http://localhost:3001/signup', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.status === 409) {
                    alert('Username or E-mail already exists');
                    return false;
                } else {
                    alert('Registration Successful!');
                    return true;
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return signUp;

}


export default useSignUp;