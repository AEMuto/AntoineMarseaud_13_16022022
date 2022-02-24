import { StyledMain } from './container/StyledMain';
import { SignInForm } from '../components/SignInForm';
import { FormEvent, useEffect, useState } from 'react';
import { useLogin } from '../services/useLogin';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, toggleChecked] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' });

  const { isLoading, token, error } = useLogin(payload);

  useEffect(() => {
    //console.log(error);
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      setPayload({ email: email, password: password });
    }
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
      />
    </StyledMain>
  );
};
