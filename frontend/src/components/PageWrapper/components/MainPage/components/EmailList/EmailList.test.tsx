import React from 'react';
import { render, screen } from '@testing-library/react';
import EmailList from './index';
import { emailStubArray } from '../../../../../../test/stubs/email.stub';

describe('EmailList', () => {
  it('should render a loading message when loading prop is true', () => {
    render(<EmailList emails={[]} loading={true} />);
    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render a message when there are no emails', () => {
    render(<EmailList emails={[]} loading={false} />);
    const emptyMessage = screen.getByText('No emails to show');
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should render a list of emails when there are emails', () => {
    render(<EmailList emails={emailStubArray} loading={false} />);
    const emailItems = screen.getAllByRole('listitem');
    expect(emailItems).toHaveLength(emailStubArray.length);

    emailStubArray.forEach((email) => {
      const senderName = screen.getByText(email.sender);
      const subjectText = screen.getByText(email.subject);
      const bodyText = screen.getByText(email.body);
      const dateText = screen.getByText(new Date(email.date).toDateString());

      expect(senderName).toBeInTheDocument();
      expect(subjectText).toBeInTheDocument();
      expect(bodyText).toBeInTheDocument();
      expect(dateText).toBeInTheDocument();
    });
  });
});
