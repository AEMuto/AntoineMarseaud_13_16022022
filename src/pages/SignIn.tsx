import { StyledMain } from './container/StyledMain';
import { SignInForm } from '../components/SignInForm';
import { FormEvent, useEffect, useState } from 'react';
import { loginError, useLogin } from '../services/useLogin';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, toggleChecked] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' });

  const [isLoading, token, error, setError] = useLogin(payload);
  const navigate = useNavigate();

  useEffect(() => {
    // store token to store
    // navigate to user page
    if (token) navigate('/profile');
  }, [token]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: loginError = {};
    if (!email) {
      errors.email = 'This field is required';
      console.log(errors);
    }
    if (!password) {
      errors.password = 'This field is required';
      console.log(errors);
    }
    if (email && password) {
      setPayload({ email, password });
    }
    setError({ ...errors });
  };

  return (
    <StyledMain background={true}>
      <SignInForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isChecked={isChecked}
        toggleChecked={toggleChecked}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
        setError={setError}
      />
    </StyledMain>
  );
};
