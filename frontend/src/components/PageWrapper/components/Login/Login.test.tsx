import { fireEvent, render, screen } from '@testing-library/react';

import { useSessionContext } from '../../../../contexts/sessionContext';
import Login from './index';

jest.mock('../../../../contexts/sessionContext');

describe('Login', () => {
  beforeEach(() => {
    (useSessionContext as jest.Mock).mockReturnValue({
      setUser: jest.fn(),
    });
  });

  it('should render the Login component', () => {
    render(<Login />);
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('should update the email input value on change', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should call the setUser function with the email value when submitted', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const loginButton = screen.getByTestId('login-button');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(loginButton);
    expect(useSessionContext().setUser).toHaveBeenCalledWith(
      'test@example.com',
    );
  });
});
