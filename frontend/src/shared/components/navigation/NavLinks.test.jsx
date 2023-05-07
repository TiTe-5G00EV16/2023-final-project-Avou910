import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import NavLinks from './NavLinks';

describe('The Navigation Links', () => {
  test('Should only show ALL ARTICLES and AUTHENTICATE when not authorized', () =>{
    render(
        <BrowserRouter>
          <NavLinks/>;
        </BrowserRouter>
    );

    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('ALL ARTICLES')).toBeInTheDocument();
    expect(screen.getByText('ALL ARTICLES')).toHaveAttribute('href', '/');
    
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
    expect(screen.getByText('LOG IN')).toHaveAttribute('href', '/auth');

    expect(screen.queryByText('USERS')).toBeNull();
  });

  test('Should show correct buttons when authorized', () =>{
    render(
      <AuthContext.Provider value={{
        isLoggedIn: true,
        token: '1234567890-0987654321',
        userId: 'userId1',
        login: () => {},
        logout: () => {}
      }}
      >
        <BrowserRouter>
          <NavLinks/>;
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByRole('list')).toHaveClass('nav-links');
    expect(screen.getByText('ALL ARTICLES')).toBeInTheDocument();
    expect(screen.getByText('ALL ARTICLES')).toHaveAttribute('href', '/');
    
    expect(screen.queryByText('LOG IN')).toBeNull();

    expect(screen.getByText('USER PROFILE')).toBeInTheDocument();
    expect(screen.getByText('USER PROFILE')).toHaveAttribute('href', '/users');

    expect(screen.getByText('ADD NEW ARTICLE FOR SALE')).toBeInTheDocument();
    expect(screen.getByText('ADD NEW ARTICLE FOR SALE')).toHaveAttribute('href', '/articles/new');

    expect(screen.getByRole('button', { name: 'LOG OUT'})).toBeInTheDocument();
  });
});
