import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from './theme/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';
import getLSToken from './utils/getLSToken';
import { useAppDispatch } from './hooks';
import { setToken } from './store/authSlice';
import { fetchUserProfile } from './store/authThunks';
import RepoLink from './components/RepoLink';

/**
 * Our top level component. We wrap it with the Redux store Provider in the ReactDOM render method
 * further down. It allows us to use the useAppSelect hook later in ours children components, which
 * is needed to retrieve the state of our Redux store.
 * @constructor
 */
const App = () => {
  const dispatch = useAppDispatch();

  // First thing we need to do is to verify if there is a token present in the
  // local storage, then we'll fetch the user information if that's the case.
  // The token could be expired or invalid. If that so, there will be a message
  // in our error state. I made the choice to not reflect it in the UI, because
  // it doesn't change anything for the user. His session has expired, and his
  // only choice is to log in again. Albeit, we handle this particular case
  // when the user try to access directly the '/profile' page, so check
  // AppRoutes.tsx and its RequireAuth component.
  useEffect(() => {
    const token = getLSToken();
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUserProfile({ token }));
    }
  }, []);

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
      <RepoLink />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

