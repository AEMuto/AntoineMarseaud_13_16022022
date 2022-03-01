import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { useAppSelector } from '../hooks';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isConnected } = useAppSelector((state) => state.auth);

  if (!isConnected) {
    return <Navigate to="/login" />;
  }
  return children;
};
