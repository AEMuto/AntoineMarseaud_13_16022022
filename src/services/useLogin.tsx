import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import wait from '../utils/wait';

const API = import.meta.env.VITE_API;

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
          url: `${API}login`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        const response = await axios(config);
        setToken(response.data.body.token);
      } catch (err) {
        const error = err as AxiosError;

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

    //TODO: Place connectUser in another hook called 'useConnect' ? & finish it.
    async function connectUser(token: string) {
      if (!token) return;
      try {
        const config:AxiosRequestConfig = {
          method: 'post',
          url: `${API}profile`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios(config)

      } catch {
      } finally {
      }
    }

    getToken();
  }, [email, password]);

  return [isLoading, token, error, setError];
};
