import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { ApiContext } from '../../../context/ApiContext';
import { AuthContext } from '../../../context/AuthContext';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Login Page', () => {
  const mockEndpoints = {
    login: '/fake-login',
  };

  const mockAuth = {
    login: jest.fn(),
    user: null,
  };

  it('renders email and password fields', () => {
    render(
      <BrowserRouter>
        <ApiContext.Provider value={{ endpoints: mockEndpoints }}>
          <AuthContext.Provider value={mockAuth}>
            <Login />
          </AuthContext.Provider>
        </ApiContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});

