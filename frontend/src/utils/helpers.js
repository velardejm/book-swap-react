export const updateForm = (e, dataSetter) => {
  const { name, value } = e.target;
  dataSetter((prevData) => {
    return {
      ...prevData,
      [name]: value,
    };
  });
};

// export const signUp = async (data) => {
//   try {
//     const { password, passwordConfirmation } = data;
//     if (password !== passwordConfirmation) {
//       alert('Incorrect password verification.');
//     } else {
//       const response = await fetch('http://localhost:3001/signup', {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.status === 409) {
//         alert('Username or E-mail already exists');
//         return false;
//       } else {
//         alert('Registration Successful!');
//         return true;
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const logIn = async (formData, url) => {
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(formData),
//   });

//   const data = await res.json();

//   if (data.token) {
//     localStorage.setItem('token', data.token);
//     return true;
//   } else {
//     alert(data.message);
//   }
// };


