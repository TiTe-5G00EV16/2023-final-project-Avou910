import { useRef, useState, useContext } from 'react';
import { useMutation } from 'react-query';

import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';

import { resetPassword } from '../api/users';

import './ResetPassword.css';

const ResetPassword = props => {

    const emailRef = useRef();
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
            {isLoading ? 'Sending...' : 'Reset Password'}
          </Button>
        </div>
      </form>
      <br />

      {isSuccess && (
        <div className="resetpassword_header">
          An email has been sent to your inbox with instructions for resetting
          your password.
        </div>
      )}
      {isError && (
        <div className="resetpassword_header">
          {errorMessage}
        </div>
      )}
      <br />
      <a href="/auth">Go back to log in or sign up</a>
    </Card>
  );
};

export default ResetPassword;
