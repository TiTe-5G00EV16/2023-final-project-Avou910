import { useRef, useState, useEffect, } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card';
import Input from '../../shared/components/input/Input';
import { updatePassword } from '../api/users';


import './NewPassword.css';

const NewPassword = props => {
    const history = useHistory(); 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
          setSuccessMessage('New password confirmed. You will be redirected to the login page.');

        } catch (error) {
          setIsLoading(false);
          setErrorMessage(error.message || 'Failed to update password.');
        }
    };

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                history.push('/auth');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [successMessage, history]);

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
            {successMessage && <p className="success-message">{successMessage}</p>}
        </Card>
    );
};
export default NewPassword;

