import React, { useEffect, useState } from "react";

import { useSessionContext } from "../../../../contexts/sessionContext";
import ComposeEmail from "./components/ComposeEmail";
import { EmailAPI } from "../../../../services/emailAPI";

import { Email } from "../../../../typings/email";
import "./styles.css";
import EmailList from "./components/EmailList";
import FolderTabs from "./components/FolderTabs";
import { DataLoaders } from "../../../../typings/data-loaders";
import { Socket } from "socket.io-client";

interface MainEmailPageProps {
  socket: Socket;
}

const MainEmailPage: React.FC<MainEmailPageProps> = ({ socket }) => {
  const { user } = useSessionContext();

  // State for the active tab
  const [activeTab, setActiveTab] = useState("inbox");

  // State for the emails to be displayed in the email list
  const [emails, setEmails] = useState<Email[]>([]);

  // State for the compose email modal
  const [composeEmail, setComposeEmail] = useState(false);

  // State for the loading indicator
  const [loading, setLoading] = useState(true);

  // State for the email folders
  const [dataLoaders, setDataLoaders] = useState<DataLoaders>({
    inbox: { loader: EmailAPI.getInboxEmails, data: [] },
    sent: { loader: EmailAPI.getSentEmails, data: [] },
    trash: { loader: EmailAPI.getTrashEmails, data: [] },
  });

  const updateDataLoaders = async (
    dataLoaders: DataLoaders,
    user: string,
    activeTab: string
  ) => {
    const dataLoader = dataLoaders[activeTab];

    dataLoader
      .loader(user)
      .then((response) => {
        setDataLoaders((prevDataLoaders) => ({
          ...prevDataLoaders,
          [activeTab]: {
            ...dataLoader,
            data: response,
          },
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // use websocket to update the email list
  useEffect(() => {
    if (!user) return;

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("newEmail", (email: Email) => {
      console.log("email", email);
      updateDataLoaders(dataLoaders, user, activeTab);
    });

    return () => {
      socket.off("newEmail");
    };
  }, [user, activeTab, dataLoaders, socket]);

  useEffect(() => {
    if (!user) return;

    updateDataLoaders(dataLoaders, user, activeTab);
  }, [activeTab, user]);

  useEffect(() => {
    const dataLoader = dataLoaders[activeTab];

    setEmails(dataLoader.data);
  }, [dataLoaders]);

  return (
    <section className="main-page">
      {composeEmail && <ComposeEmail composeEmailIsOpen={setComposeEmail} />}

      <FolderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setComposeEmail={setComposeEmail}
      />

      <EmailList emails={emails} loading={loading} />
    </section>
  );
};

export default MainEmailPage;
