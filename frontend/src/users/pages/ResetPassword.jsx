import { useRef, useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { Link } from "react-router-dom";


import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';

import { resetPassword } from '../api/users';

import './ResetPassword.css';

const ResetPassword = props => {

    const emailRef = useRef();
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { isError, isSuccess, mutate } = useMutation(
   
    resetPassword,

    {onSuccess: () => {
          },
    onError: (error) => {
    console.log(error)
    setErrorMessage('Email not found. Please try again.');
    setIsLoading(false);
      
          }
    }
  );

  const handleSubmit = event => {
    event.preventDefault();
    mutate({
        email: emailRef.current.value,
      });
    setIsLoading(false)
  };

  return (
    <Card className="resetpassword">
      <h2 className="resetpassword_header">Enter your email to reset password</h2>

      <form onSubmit={handleSubmit}>
             <Input id="email" ref={emailRef} type="text" label="Email" />

        <div className="authentication__buttons">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send link to reset Password'}
          </Button>
        </div>
      </form>
      <br />

      {isSuccess && (
        <div className="resetpassword_header">
          An email has been sent to your inbox with instructions for resetting
          your password. This might take a few minutes.
        </div>
      )}
      {isError && (
        <div className="resetpassword_header">
          {errorMessage}
        </div>
      )}
      <br />
      <Link to="/auth"> Go back to log in or sign up</Link>
    </Card>
  );
};

export default ResetPassword;
