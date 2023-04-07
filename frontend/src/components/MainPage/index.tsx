import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '../../contexts/sessionContext';
import Login from '../Login';
import ComposeEmail from './ComposeEmail';
import api from '../../services/api';

import { Email } from '../../typings/email';
import './styles.css';

interface MainEmailPageProps {
  mailboxRoute: string;
}

const MainEmailPage: React.FC<MainEmailPageProps> = ({ mailboxRoute }) => {
  const history = useHistory();

  const { user } = useSessionContext();

  const [emails, setEmails] = useState<Email[]>([]);
  const [composeEmail, setComposeEmail] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleComposeEmail = () => {
    setComposeEmail(true);
  };

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    api
      .get(mailboxRoute + user)
      .then((response) => {
        setEmails(response.data);
      })
      .then(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    <>
      {!user && <Login />}

      <section className="main-page">
        {composeEmail && <ComposeEmail composeEmailIsOpen={setComposeEmail} />}
        <div className="main-page-container-menu">
          <div className="email-compose">
            <button
              onClick={handleComposeEmail}
              className="email-compose-button"
            >
              <span className="email-compose-button-icon">
                <i className="fas fa-pencil-alt"></i>
              </span>
              <span className="email-compose-button-text">Compose</span>
            </button>
          </div>
          <div className="email-folders">
            <div
              className="email-folders-item inbox"
              onClick={() => history.push('/inbox')}
            >
              <span className="email-folders-item-text">Inbox</span>
            </div>
            <div
              className="email-folders-item sent"
              onClick={() => history.push('/sent')}
            >
              <span className="email-folders-item-text">Sent</span>
            </div>
            <div className="email-folders-item trash">
              <span className="email-folders-item-text">Trash</span>
            </div>
          </div>
        </div>
        <div className="main-page-container-mailbox">
          {loading ? (
            <div className="email-list-loading">
              <span className="email-list-loading-text">Loading...</span>
            </div>
          ) : (
            <div className="email-list">
              {emails.length > 0 ? (
                emails.map((email) => {
                  return (
                    <div className="email-list-item">
                      <div className="email-list-item-content">
                        <div className="email-list-item-content-wrapper">
                          <div className="email-list-item-content-sender">
                            <span className="email-list-item-content-sender-name">
                              {email.sender}
                            </span>
                          </div>
                          <div className="email-list-item-content-subject">
                            <span className="email-list-item-content-subject-text">
                              {email.subject}
                            </span>
                            <span className="email-list-item-content-body-text">
                              &nbsp;-&nbsp;{email.body}
                            </span>
                          </div>
                        </div>
                        <div className="email-list-item-content-date">
                          <span className="email-list-item-content-date-text">
                            {new Date(email.date).toDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="email-list-empty-message">
                  <span className="email-list-empty-message-text">
                    No emails to show
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MainEmailPage;
