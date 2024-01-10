const useLogin = (formData) => {

    const logIn = async () =>  {

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
                return true;
            } else {
                alert(data.message);
                return false;
            }
    
    }

    return logIn;

};


export default useLogin;



// const useLogin = (formData) => {

//     const logIn = () => {
        
//         const logInRequest = async () => {
//             const res = await fetch('http://localhost:3001/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await res.json();
            
//             if (data.token) {
//                 localStorage.setItem('token', data.token);
//                 return true;
//             } else {
//                 alert(data.message);
//                 return false;
//             }
//         }

//         return logInRequest();
        
//     }

//     return logIn;

// };