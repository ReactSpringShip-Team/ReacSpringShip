import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import { BrowserRouter } from 'react-router-dom';

// We mock the hook to control its state and functions in isolation for component testing
// or we can mock its dependencies. Let's mock the dependencies and use the real hook.
vi.mock('../services/auth.service', () => ({
  authService: {
    register: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  BrowserRouter: ({ children }: any) => <div>{children}</div>
}));

describe('RegisterForm', () => {
  const mockSetView = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all input fields', () => {
    render(<RegisterForm setView={mockSetView} />, { wrapper: BrowserRouter });
    
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/User@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Password$/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('should show validation errors when fields are empty and form is submitted', async () => {
    render(<RegisterForm setView={mockSetView} />, { wrapper: BrowserRouter });
    
    const registerButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerButton);

    expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter a valid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('should show error when passwords do not match', async () => {
    render(<RegisterForm setView={mockSetView} />, { wrapper: BrowserRouter });
    
    fireEvent.change(screen.getByPlaceholderText(/^Password$/), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), { target: { value: 'password456' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('should show error when username is too short', async () => {
    render(<RegisterForm setView={mockSetView} />, { wrapper: BrowserRouter });
    
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'ab' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/At least 3 characters/i)).toBeInTheDocument();
  });

  it('should call setView("login") when login link is clicked', () => {
    render(<RegisterForm setView={mockSetView} />, { wrapper: BrowserRouter });
    
    const loginLink = screen.getByText(/Login here/i);
    fireEvent.click(loginLink);

    expect(mockSetView).toHaveBeenCalledWith('login');
  });
});
