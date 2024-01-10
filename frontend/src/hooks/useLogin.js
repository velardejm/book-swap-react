const useLogin = (formData) => {

    const logIn = () => {
        let isLoggedIn = false;

        const logInRequest = async () => {
            const res = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                isLoggedIn = true;
            } else {
                alert(data.message);
                isLoggedIn = false;
            }
        }

        logInRequest();

        return isLoggedIn;
    }

    return logIn;

};


export default useLogin;
