import { useRef, useState, useContext } from 'react';
import { useMutation } from 'react-query';

import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';

import { loginUser, signUpUser } from '../api/users';
import { AuthContext } from '../../shared/context/auth-context';

import './Authenticate.css';

const Authenticate = props => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginMode, setLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const switchModeHandler = () => {
    setLoginMode(prevMode => !prevMode);
  }

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token, data.email);
    },
    onError: (error) => {
      console.log(error)
      setErrorMessage('Email already exists');

    }
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token,data.email);
    },
    onError: (error) => {
      console.log(error)
      setErrorMessage('Email or password is incorrect');

    }
  });

  

  const onSubmitHandler = event => {
    event.preventDefault();
    if(isLoginMode) {
      if (!emailRef.current.value || !passwordRef.current.value) {
        setErrorMessage('Please fill in all required fields');
      } else {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
    } 
  }else {
    if (!emailRef.current.value || !passwordRef.current.value || !passwordConfirmRef.current.value) {
      setErrorMessage('Please fill in all required fields');
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setErrorMessage('Passwords do not match');
      }
    
    else {
      signUpUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      });
    }
  }
}

  return (
    <Card className="authentication">
      <h2 className='authentication_header'>{isLoginMode? 'LOG IN': 'SIGN UP'}</h2>
     <p className="error-message">{errorMessage}</p>
      <form onSubmit={onSubmitHandler}>
        <Input id="email" ref={emailRef} type="email" label="Email" required />
        <Input id="password" ref={passwordRef} type="password" label="Password" required /> 
        {isLoginMode ? null : <Input id="password-confirm" ref={passwordConfirmRef} type="password" label="Confirm Password" required />}
        <div className="authentication__buttons">
          <Button type="submit">
            {isLoginMode? 'LOG IN' : 'SIGN UP'}
          </Button>
        </div>
      </form>
      <Button type="button" onClick={switchModeHandler}>
            {isLoginMode? 'SIGN UP' : 'LOG IN'}
          </Button>
    </Card>
  )
};

export default Authenticate;
