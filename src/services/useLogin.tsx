import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import wait from '../utils/wait';

const API = import.meta.env.VITE_API;
const ENDPOINT = `${API}login`;

type loginInfo = {
  email: string;
  password: string;
};

export type loginError = {
  email?: string;
  password?: string;
  other?: string;
};

type loginReturnValues = [
  boolean,
  string,
  loginError | null,
  Dispatch<SetStateAction<loginError | null>>,
];

export const useLogin = ({ email, password }: loginInfo): loginReturnValues => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<loginError | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!email || !password) return;

    setIsLoading(true);

    async function getToken() {
      try {
        const data = JSON.stringify({
          email: email,
          password: password,
        });

        const config: AxiosRequestConfig = {
          method: 'post',
          url: ENDPOINT,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        const response = await axios(config);
        console.log(response);
        // @ts-ignore
        setToken(response);
      } catch (err) {
        const error = err as AxiosError;
        //console.log(error.response);
        await wait(250);
        if (error.response?.data.message.includes('User')) {
          setError({ email: 'Invalid Username' });
        } else if (error.response?.data.message.includes('Password')) {
          setError({ password: 'Invalid Password' });
        } else {
          setError({ other: `${error.response?.statusText}` });
        }
      } finally {
        setIsLoading(false);
      }
    }

    getToken();
  }, [email, password]);
  return [isLoading, token, error, setError];
};
