import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ComposeEmail from './index';
import { useSessionContext } from '../../../../../../contexts/sessionContext';
import { EmailAPI } from '../../../../../../services/emailAPI';

jest.mock('../../../../../../contexts/sessionContext');
jest.mock('../../../../../../services/emailAPI');

describe('ComposeEmail component', () => {
  const composeEmailIsOpenMock = jest.fn();

  beforeEach(() => {
    (useSessionContext as jest.Mock).mockReturnValue({
      user: 'test@test.com',
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render ComposeEmail component', () => {
    render(<ComposeEmail composeEmailIsOpen={composeEmailIsOpenMock} />);
    const composeEmailHeader = screen.getByText('Compose Email');
    expect(composeEmailHeader).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    render(<ComposeEmail composeEmailIsOpen={composeEmailIsOpenMock} />);
    const emailToInput: HTMLInputElement = screen.getByTestId('to');
    const emailSubjectInput: HTMLInputElement = screen.getByTestId('subject');
    const emailBodyTextarea: HTMLInputElement = screen.getByTestId('body');

    fireEvent.change(emailToInput, {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(emailSubjectInput, {
      target: { value: 'test subject' },
    });
    fireEvent.change(emailBodyTextarea, {
      target: { value: 'test email body' },
    });

    expect(emailToInput.value).toBe('test@test.com');
    expect(emailSubjectInput.value).toBe('test subject');
    expect(emailBodyTextarea.value).toBe('test email body');
  });

  it('should handle form submit', () => {
    const sendEmailMock = jest.fn().mockResolvedValue({});

    EmailAPI.sendEmail = sendEmailMock;

    render(<ComposeEmail composeEmailIsOpen={composeEmailIsOpenMock} />);
    const emailToInput: HTMLInputElement = screen.getByTestId('to');
    const emailSubjectInput: HTMLInputElement = screen.getByTestId('subject');
    const emailBodyTextarea: HTMLInputElement = screen.getByTestId('body');
    const sendButton = screen.getByText('Send');

    fireEvent.change(emailToInput, {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(emailSubjectInput, {
      target: { value: 'test subject' },
    });
    fireEvent.change(emailBodyTextarea, {
      target: { value: 'test email body' },
    });
    fireEvent.click(sendButton);

    expect(sendEmailMock).toHaveBeenCalledWith({
      sender: 'test@test.com',
      recipient: 'test@test.com',
      subject: 'test subject',
      body: 'test email body',
    });
  });
});
