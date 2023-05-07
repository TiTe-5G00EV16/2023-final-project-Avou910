export const getArticles = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/articles`
    );
    return await res.json();
  };
  
  export const createArticle = async ({ title, price,description, image,token,email,userId}) => {

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/articles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          title,
          price,
          description,
          image,
          email,
          userId
          
        })
      }
    );
    
    return await res.json();
  };
  
  export const deleteArticle = async ({ id,token }) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/articles/`+id,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );
    return await res.json();
  };
  
  export const searchArticles = async (searchTerm) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles?search=${searchTerm}`);
    return await res.json();
  };