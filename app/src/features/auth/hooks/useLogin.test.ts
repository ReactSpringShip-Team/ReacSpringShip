import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogin } from './useLogin';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useNotification } from '../../../shared/context/NotificationContext';

// Mocks
vi.mock('../services/auth.service', () => ({
  authService: {
    login: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('./useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../shared/context/NotificationContext', () => ({
  useNotification: vi.fn(),
}));

describe('useLogin', () => {
  const mockNavigate = vi.fn();
  const mockLoginAction = vi.fn();
  const mockShowNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useAuth as any).mockReturnValue({
      login: mockLoginAction,
    });
    (useNotification as any).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  it('should initialize with default form values', () => {
    const { result } = renderHook(() => useLogin());
    
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should call authService.login, login action and navigate on success', async () => {
    const mockResponse = { token: 'fake-jwt-token' };
    (authService.login as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin());

    const formData = {
      username: 'testuser',
      password: 'password123',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(authService.login).toHaveBeenCalledWith(
      formData.username,
      formData.password
    );
    expect(mockLoginAction).toHaveBeenCalledWith(mockResponse.token);
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('should handle login failure from service', async () => {
    const mockError = new Error('Invalid credentials');
    (authService.login as any).mockRejectedValue(mockError);
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { result } = renderHook(() => useLogin());

    const formData = {
      username: 'wronguser',
      password: 'wrongpassword',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(authService.login).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("Error in the login", mockError);
    expect(mockShowNotification).toHaveBeenCalledWith("Invalid credentials", "error");
    expect(mockLoginAction).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
