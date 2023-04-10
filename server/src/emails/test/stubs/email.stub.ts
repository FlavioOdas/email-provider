import { EmailDocument } from 'src/emails/emails.schema';

export const emailStub = (): Partial<EmailDocument> => {
  return {
    _id: 'testId',
    sender: 'testSender@test.com',
    recipient: 'testRecipient@test.com',
    subject: 'Test Subject',
    body: 'Test Body',
    date: new Date('2021-01-01'),
    read: false,
    deleted: false,
  };
};
