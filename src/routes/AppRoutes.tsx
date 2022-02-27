import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

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
  // TODO: retrieve auth status
  let location = useLocation();
  //TODO: add if statement for the case when the users aren't logged in,
  // in order to redirect them to the sign-in page, but save the current location they were
  // <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};
