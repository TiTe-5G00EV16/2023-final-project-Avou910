export const signUpUser = async ({email, password}) => {
  const res = await fetch(
    "http://localhost:5000/api/users/signup",
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
    "http://localhost:5000/api/users/login",
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

export const getUser = async () => {
  const res = await fetch(
    "http://localhost:5000/api/users"
  );
  return await res.json();
};