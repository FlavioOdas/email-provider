// component to compose email
import React, { useState } from "react";
import { useSessionContext } from "../../../../../../contexts/sessionContext";
import { EmailAPI } from "../../../../../../services/emailAPI";

import "./styles.css";
import { SendEmailRequest } from "../../../../../../typings/email-api";

interface ComposeEmailProps {
  composeEmailIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ composeEmailIsOpen }) => {
  const { user } = useSessionContext();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSendEmail = () => {
    if (!user) return;

    const email: SendEmailRequest = {
      sender: user,
      recipient: to,
      subject,
      body,
    };

    EmailAPI.sendEmail(email)
      .then((res) => {
        console.log("res", res);
        composeEmailIsOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="compose-email">
      <div className="compose-email-container">
        <div className="compose-email-container-header">
          <h1 className="compose-email-container-header-title">
            Compose Email
          </h1>

          <button
            className="compose-email-container-header-close"
            onClick={() => composeEmailIsOpen(false)}
          />
        </div>
        <div className="compose-email-container-content">
          <form
            className="compose-email-container-content-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
          >
            <div className="compose-email-container-content-form-field email-to">
              <label htmlFor="to">To</label>
              <input
                type="email"
                name="to"
                id="to"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="compose-email-container-content-form-field email-subject">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="compose-email-container-content-form-field">
              <textarea
                name="body"
                id="body"
                cols={30}
                rows={10}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div className="compose-email-container-content-form-field">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;
