import { AxiosResponse } from 'axios';

import { Email } from '../typings/email';
import { SendEmailRequest, UpdateEmailRequest } from '../typings/email-api';
import { api } from './configs/axiosConfigs';

export const EmailAPI = {
  // Sends an email
  sendEmail: async (email: SendEmailRequest) => {
    const response: AxiosResponse<Email> = await api.post('/emails', {
      ...email,
    });

    return response.data;
  },

  // Returns an email with the given id
  getEmail: async (id: string) => {
    const response: AxiosResponse<Email> = await api.get('/emails/' + id);
    return response.data;
  },

  // Returns all emails
  getAllEmails: async () => {
    const response: AxiosResponse<Email[]> = await api.get('/emails');
    return response.data;
  },

  // Returns all inbox emails for a given user
  getInboxEmails: async (user: string) => {
    console.log('user', user);

    const response: AxiosResponse<Email[]> = await api.get(
      '/emails/inbox/' + user,
    );
    return response.data;
  },

  // Returns all sent emails for a given user
  getSentEmails: async (user: string) => {
    const response: AxiosResponse<Email[]> = await api.get(
      '/emails/sent/' + user,
    );
    return response.data;
  },

  // Returns all trash emails for a given user
  getTrashEmails: async (user: string) => {
    const response: AxiosResponse<Email[]> = await api.get(
      '/emails/trash/' + user,
    );
    return response.data;
  },

  // Updates an email
  updateEmail: async (id: string, email: UpdateEmailRequest) => {
    const response: AxiosResponse<Email> = await api.put('/email/' + id, {
      ...email,
    });

    return response.data;
  },

  // Deletes an email
  deleteEmail: async (id: string) => {
    await api.put('/email/' + id, {
      deleted: true,
    });
  },
};
