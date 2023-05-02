import { useRef, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';
import { updatePassword } from '../api/users';


import './NewPassword.css';

const NewPassword = props => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordSubmit = event => {
        event.preventDefault();
        const enteredPassword = passwordRef.current.value;
        const enteredPasswordConfirm = passwordConfirmRef.current.value;
        const newPassword = enteredPassword;
        if (enteredPassword !== enteredPasswordConfirm) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        try {
          updatePassword( email,token, newPassword);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setErrorMessage(error.message || 'Failed to update password.');
        }
    };

    return (
        <Card className="resetpassword">
            <h2 className="resetpassword_header">Enter your new password</h2>
            <form onSubmit={handlePasswordSubmit}>
                <Input id="password" ref={passwordRef} type="password" label="Password" required />
                <Input id="password-confirm" ref={passwordConfirmRef} type="password" label="Confirm Password" required />
                <div className="authentication__buttons">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Set new password'}
                    </Button>
                </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Card>
    );
};
export default NewPassword;

