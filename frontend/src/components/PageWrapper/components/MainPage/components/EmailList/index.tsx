import React from 'react';
import { Email } from '../../../../../../typings/email';

import './styles.css';

interface EmailListProps {
  emails: Email[];
  loading: boolean;
}

const EmailList: React.FC<EmailListProps> = ({ emails, loading }) => {
  return (
    <div className="main-page-container-mailbox">
      {loading ? (
        <div className="email-list-loading">
          <span className="email-list-loading-text">Loading...</span>
        </div>
      ) : (
        <ul className="email-list">
          {emails.length > 0 ? (
            emails.map((email) => {
              return (
                <li key={email.id} className="email-list-item">
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
                        &nbsp;-&nbsp;
                        <span className="email-list-item-content-body-text">
                          {email.body}
                        </span>
                      </div>
                    </div>
                    <div className="email-list-item-content-date">
                      <span className="email-list-item-content-date-text">
                        {new Date(email.date).toDateString()}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="email-list-empty-message">
              <span className="email-list-empty-message-text">
                No emails to show
              </span>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default EmailList;
