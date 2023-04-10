/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MainEmailPage from './index';
import MockSocket from 'socket.io-mock';
import { useSessionContext } from '../../../../contexts/sessionContext';
import { EmailAPI } from '../../../../services/emailAPI';
import { emailStubArray } from '../../../../test/stubs/email.stub';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

// Mock the socket.io-client
jest.mock('socket.io-client', () => {
  return jest.fn().mockImplementation(() => {
    return {
      on: jest.fn(),
      emit: jest.fn(),
      off: jest.fn(),
    };
  });
});

// Mock the useSessionContext hook
jest.mock('../../../../contexts/sessionContext', () => ({
  useSessionContext: jest.fn(),
}));

// Mock the EmailAPI service
jest.mock('../../../../services/emailAPI', () => ({
  EmailAPI: {
    getInboxEmails: jest.fn(() => Promise.resolve([])),
    getSentEmails: jest.fn(() => Promise.resolve([])),
    getTrashEmails: jest.fn(() => Promise.resolve([])),
  },
}));

describe('MainEmailPage', () => {
  let mockedSocket: Socket<DefaultEventsMap, DefaultEventsMap>;

  beforeEach(() => {
    mockedSocket = new MockSocket();

    (useSessionContext as jest.Mock).mockReturnValue({
      user: 'test@test.com',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    // mock the updateDataLoaders function
    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });

    await act(async () => render(<MainEmailPage socket={mockedSocket} />));
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('displays emails when the inbox tab is active', async () => {
    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve(emailStubArray);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    render(<MainEmailPage socket={mockedSocket} />);

    await screen.findByText('Email 1');

    expect(EmailAPI.getInboxEmails).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Email 1')).toBeInTheDocument();
    expect(screen.getByText('Email 2')).toBeInTheDocument();
  });

  it('displays emails when the sent tab is active', async () => {
    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });
    (EmailAPI.getSentEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve(emailStubArray);
    });

    render(<MainEmailPage socket={mockedSocket} />);

    fireEvent.click(screen.getByTestId('sent'));

    await screen.findByText('Email 1');

    expect(EmailAPI.getSentEmails).toBeCalledTimes(1);
    expect(screen.getByText('Email 1')).toBeInTheDocument();
    expect(screen.getByText('Email 2')).toBeInTheDocument();
  });

  it('displays emails when the trash tab is active', async () => {
    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });
    (EmailAPI.getTrashEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve(emailStubArray);
    });

    render(<MainEmailPage socket={mockedSocket} />);

    fireEvent.click(screen.getByTestId('trash'));

    await screen.findByText('Email 1');

    expect(EmailAPI.getTrashEmails).toBeCalledTimes(1);
    expect(screen.getByText('Email 1')).toBeInTheDocument();
    expect(screen.getByText('Email 2')).toBeInTheDocument();
  });
});
