import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRegister } from './useRegister';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

// Mocks
vi.mock('../services/auth.service', () => ({
  authService: {
    register: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useRegister', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it('should initialize with default form values', () => {
    const { result } = renderHook(() => useRegister());
    
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should call authService.register and navigate on success', async () => {
    const mockResponse = { message: 'Success' };
    (authService.register as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRegister());

    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(authService.register).toHaveBeenCalledWith(
      formData.username,
      formData.email,
      formData.password
    );
    expect(mockNavigate).toHaveBeenCalledWith('/auth', { state: { view: 'login' } });
  });

  it('should handle registration failure from service', async () => {
    const mockError = new Error('Registration failed');
    (authService.register as any).mockRejectedValue(mockError);
    
    // Spy on console.error to avoid noise in test output and verify it's called
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useRegister());

    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    expect(authService.register).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("Error en el registro:", mockError);
    expect(mockNavigate).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
