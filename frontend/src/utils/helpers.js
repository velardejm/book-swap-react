import { useNavigate } from 'react-router-dom';

export const updateForm = (e, dataSetter) => {
  const { name, value } = e.target;
  dataSetter((prevData) => {
    return {
      ...prevData,
      [name]: value,
    };
  });
};

export const signUp = async (data) => {
  try {
    const { password, passwordConfirmation } = data;
    if (password !== passwordConfirmation) {
      alert('Incorrect password verification.');
    } else {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
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

export const logIn = async (formData, url) => {
  const res = await fetch(url, {
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
  }
};

// export const authorizedFetchData = async (url) => {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// };

// export const loadProtectedRoute = async (url) => {
//   const navigate = useNavigate();
//   const response = await fetch('http://localhost:3001/authenticate', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });
//   if (response.status === 200) {
//     navigate(url);
//   } else {
//     navigate('/login', { state: { from: url } });
//   }
// };

// export const useLoadProtectedRoute = (url) => {
//   const navigate = useNavigate();

//   const loadProtectedRoute = async (url) => {
//     const response = await fetch('http://localhost:3001/authenticate', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     if (response.status === 200) {
//       navigate(url);
//     } else {
//       navigate('/login', { state: { from: url } });
//     }
//   };

//   return loadProtectedRoute;
// };
