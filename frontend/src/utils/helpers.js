import supabase from "../supabase";


export const updateForm = (e, dataSetter) => {
  const { name, value } = e.target;
  dataSetter((prevData) => {
    return {
      ...prevData,
      [name]: value,
    };
  });
};

export const signUp = async (passwordConfirmation, registrationData) => {
  
  const { name, email, username, password } = registrationData;
  
  if (password !== passwordConfirmation) {
    console.log(password);
    console.log(passwordConfirmation);
    alert('Incorrect password verification.');
  } else {
    try {
      const { data: newUserData, error: addUserError } = await supabase.from('users')
        .upsert({ username: username, password: password })
        .select('id');

      const newUserId = newUserData[0].id;

      if (addUserError) throw addUserError;

      const { error: addUserDetailsError } = await supabase
        .from('usersinfo')
        .insert({ 'id': newUserId, 'name': name, 'email': email, 'user_id': newUserId });

      if (addUserDetailsError) {
        const { error: userDeleteError } = await supabase.from('users').delete().eq('id', newUserId);
        if (userDeleteError) throw userDeleteError;
        throw addUserDetailsError;
      }

      alert("Signed up successfully.");

    } catch (error) {
      alert("Sign up failed.")
      console.log(error);
    }
  }

}
