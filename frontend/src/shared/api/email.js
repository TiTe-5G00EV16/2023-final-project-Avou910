export const sendEmail = async ({emailTo, subject, message}) => {
console.log("emailTo: ", emailTo);
console.log("subject: ", subject);
console.log("message: ", message);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          emailTo,
          subject,
          message
        })
      }
    );
    
    return await res.json();
  };
  