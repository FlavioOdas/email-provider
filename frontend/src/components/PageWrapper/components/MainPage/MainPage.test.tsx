/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import MainEmailPage from "./index";
import MockSocket from "socket.io-mock";
import { useSessionContext } from "../../../../contexts/sessionContext";
import { EmailAPI } from "../../../../services/emailAPI";

// Mock the socket.io-client
jest.mock("socket.io-client", () => {
  return jest.fn().mockImplementation(() => {
    return {
      on: jest.fn(),
      emit: jest.fn(),
      off: jest.fn(),
    };
  });
});

// Mock the useSessionContext hook
jest.mock("../../../../contexts/sessionContext", () => ({
  useSessionContext: jest.fn(),
}));

// Mock the EmailAPI service
jest.mock("../../../../services/emailAPI", () => ({
  EmailAPI: {
    getInboxEmails: jest.fn(() => Promise.resolve([])),
    getSentEmails: jest.fn(() => Promise.resolve([])),
    getTrashEmails: jest.fn(() => Promise.resolve([])),
  },
}));

describe("MainEmailPage", () => {
  it("renders without crashing", async () => {
    const mockedSocket = new MockSocket();

    (useSessionContext as jest.Mock).mockReturnValue({
      user: "test@test.com",
    });

    // mock the updateDataLoaders function
    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => render(<MainEmailPage socket={mockedSocket} />));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  it("displays emails when the inbox tab is active", async () => {
    const mockedSocket = new MockSocket();

    (useSessionContext as jest.Mock).mockReturnValue({
      user: "test@test.com",
    });

    const emails = [
      { id: "1", subject: "Email 1", body: "Body of email 1" },
      { id: "2", subject: "Email 2", body: "Body of email 2" },
    ];
    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve(emails);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    render(<MainEmailPage socket={mockedSocket} />);

    await screen.findByText("Email 1");

    expect(EmailAPI.getInboxEmails).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Email 1")).toBeInTheDocument();
    expect(screen.getByText("Email 2")).toBeInTheDocument();
  });

  it("displays emails when the sent tab is active", async () => {
    const mockedSocket = new MockSocket();

    (useSessionContext as jest.Mock).mockReturnValue({
      user: "test@test.com",
    });

    const emails = [
      {
        id: "1",
        sender: "test@test.com",
        recipient: "recipient@test.com",
        subject: "Email 1",
        body: "Body of email 1",
        date: new Date("2021-01-01"),
      },
      {
        id: "2",
        sender: "test@test.com",
        recipient: "recipient@test.com",
        subject: "Email 2",
        body: "Body of email 2",
        date: new Date("2021-01-01"),
      },
    ];

    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });
    (EmailAPI.getSentEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve(emails);
    });

    render(<MainEmailPage socket={mockedSocket} />);

    fireEvent.click(screen.getByTestId("sent"));

    await screen.findByText("Email 1");

    expect(EmailAPI.getSentEmails).toBeCalledTimes(1);
    expect(screen.getByText("Email 1")).toBeInTheDocument();
    expect(screen.getByText("Email 2")).toBeInTheDocument();
  });

  it("displays emails when the trash tab is active", async () => {
    const mockedSocket = new MockSocket();

    (useSessionContext as jest.Mock).mockReturnValue({
      user: "test@test.com",
    });

    const emails = [
      {
        id: "1",
        sender: "test@test.com",
        recipient: "recipient@test.com",
        subject: "Email 1",
        body: "Body of email 1",
        date: new Date("2021-01-01"),
      },
      {
        id: "2",
        sender: "test@test.com",
        recipient: "recipient@test.com",
        subject: "Email 2",
        body: "Body of email 2",
        date: new Date("2021-01-01"),
      },
    ];

    (EmailAPI.getInboxEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve([]);
    });
    (EmailAPI.getTrashEmails as jest.Mock).mockImplementation(() => {
      return Promise.resolve(emails);
    });

    render(<MainEmailPage socket={mockedSocket} />);

    fireEvent.click(screen.getByTestId("trash"));

    await screen.findByText("Email 1");

    expect(EmailAPI.getTrashEmails).toBeCalledTimes(1);
    expect(screen.getByText("Email 1")).toBeInTheDocument();
    expect(screen.getByText("Email 2")).toBeInTheDocument();
  });
});
