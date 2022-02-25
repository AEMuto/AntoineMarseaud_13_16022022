import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './theme/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
