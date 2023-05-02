export const signUpUser = async ({email, password}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );
  
  return await res.json();
};

export const loginUser = async ({email, password}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );
  
  return await res.json();
};

export const getUser = async ({token, id}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data = await res.json();
  return data;
};

export const getAllUsers = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users`
  );
  return await res.json();
};

export const deleteUser = async ({ id,token }) => {
  console.log("check id when deleting",id)
  console.log("check token when deleting",token)

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/`+id,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );
  const data = await res.json();
return data;
};



export const resetPassword = async (email) => {
  console.log("do we get the email?",email)
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/check-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed.');
  }

};

export const updatePassword = async (email,token, newPassword) => {
  console.log("does the frontend work properly",email,token, newPassword)
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email,token, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed.');
  }

  const responseData = await response.json();

  return responseData;
};
