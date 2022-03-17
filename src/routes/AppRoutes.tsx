import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { useAppSelector } from '../hooks';

/**
 * Our routes component. There we handle which page should be
 * rendered based on the url.
 * The Profile page is "protected" behind the RequireAuth HOC.
 * @constructor
 */
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

/**
 * HOC allowing a conditional rendering whether the user is connected or not.
 * In our case we use it to render the profile page only if the user is connected.
 * If not we render the React-Router Navigate component that redirect an unauthenticated
 * client to the Login page.
 * @param children
 * @constructor
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isConnected } = useAppSelector((state) => state.auth);

  if (!isConnected) {
    return <Navigate to="/login" />;
  }
  return children;
};
