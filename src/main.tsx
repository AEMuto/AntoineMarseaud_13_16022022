import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './theme/GlobalStyle';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
};

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root'),
);
