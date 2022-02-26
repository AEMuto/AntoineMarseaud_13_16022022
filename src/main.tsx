import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './theme/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Nav />
      <AppRoutes />
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
