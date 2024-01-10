const useAuthPostRequest = (url, payload, successCb, failCb) => {
  const postRequest = async () => {
    // const isLoginSuccessful = await logIn(
    //   formData,
    //   'http://localhost:3001/login'
    // );

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    

    if (res.status === 200) {
      successCb();
      // localStorage.setItem('token', data.token);
      return true;
    } else {
      failCb()
      return false;
      // alert(data.message);
    }
  };

  // if (isLoginSuccessful) {
  //   contextLogIn();
  //   closeLoginModal();
  //   navigate(from);
  // }
};

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
