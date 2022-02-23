import { StyledMain } from './container/StyledMain';
import { SignInForm } from '../components/SignInForm';
import { FormEvent, useState } from 'react';

export const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, toggleChecked] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, password, isChecked);
  };

  return (
    <StyledMain background={true}>
      <SignInForm
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        isChecked={isChecked}
        toggleChecked={toggleChecked}
        handleSubmit={handleSubmit}
      />
    </StyledMain>
  );
};
