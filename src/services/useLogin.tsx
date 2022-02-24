import { useEffect, useState } from 'react';
import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';

const API = import.meta.env.VITE_API;
const ENDPOINT = `${API}login`;

type loginInfo = {
  email: string;
  password: string;
};

export type loginError = {
  ['for']: 'email' | 'password' | 'unknow';
  ['message']: string;
};

export const useLogin = ({ email, password }: loginInfo) => {
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
      } catch (e) {
        const error = e as AxiosError;
        //console.log(error.response);
        if (error.response?.data.message.includes('User')) {
          setError({ for: 'email', message: 'Invalid Username' });
        } else if (error.response?.data.message.includes('Password')) {
          setError({ for: 'password', message: 'Invalid Password' });
        } else {
          setError({ for: 'unknow', message: `${error.response?.statusText}` });
        }
      } finally {
        setIsLoading(false);
      }
    }

    getToken();
  }, [email, password]);
  return { isLoading, token, error };
};
