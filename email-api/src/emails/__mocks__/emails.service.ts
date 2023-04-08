import { emailStub } from '../test/stubs/email.stub';

export const EmailsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(emailStub()),
  findAll: jest.fn().mockResolvedValue([emailStub()]),
  findEmail: jest.fn().mockResolvedValue(emailStub()),
  findBySender: jest.fn().mockResolvedValue([emailStub()]),
  findByRecipient: jest.fn().mockResolvedValue([emailStub()]),
  findTrash: jest.fn().mockResolvedValue([emailStub()]),
  update: jest.fn().mockResolvedValue(emailStub()),
});
