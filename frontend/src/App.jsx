import { useState, useCallback, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Redirect, 
  Route,
  Switch } 
from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import AddArticle from './articles/pages/AddArticle';

import Users from './users/pages/Users';
import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

import './App.css';
import Articles from './articles/pages/Articles';
import UserArticles from './articles/pages/UserArticles';

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [email, setEmail] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, email, expirationDate) => {
    setToken(token);
    setuser(uid);
    setEmail(email);
    //current date + 1h
    const newTokenExpirationDate = 
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(newTokenExpirationDate);



      localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid, 
        token,
        email: email,
        expiration: newTokenExpirationDate.toISOString()
      })
    )
  },[]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.email, new Date(storedData.expiration));
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setEmail(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  },[]);


  useEffect(() => {
    if (token && tokenExpirationDate) {

      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Articles />
        </Route>
        <Route path="/articles" exact>
          <Articles />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/articles/new" exact>
          <AddArticle />
        </Route>
        <Route path="/articles/user" exact>
          <UserArticles />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Articles />
        </Route>
        <Route path="/articles" exact>
          <Articles />
          </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  
  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn: !!token, 
        token: token, 
        userId: userId,
        email: email,
        login: login, 
        logout: logout
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>
            {routes}
          </main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
