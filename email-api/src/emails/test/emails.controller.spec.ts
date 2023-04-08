import { Test } from '@nestjs/testing';
import { EmailsController } from '../emails.controller';
import { EmailsService } from '../emails.service';
import { EmailsGateway } from '../email.gateway';
import { CreateEmailDto } from '../dto/create-email.dto';
import { Email, EmailDocument } from '../emails.schema';
import { UpdateEmailDto } from '../dto/update-email.dto';
import { emailStub } from './stubs/email.stub';

jest.mock('../emails.service');
jest.mock('../email.gateway');

describe('EmailsController', () => {
  let emailsController: EmailsController;
  let emailsService: EmailsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [EmailsController],
      providers: [EmailsService, EmailsGateway],
    }).compile();

    emailsController = moduleRef.get<EmailsController>(EmailsController);
    emailsService = moduleRef.get<EmailsService>(EmailsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let result: Email[];

      beforeEach(async () => {
        result = await emailsController.findAll();
      });

      test('then it should call emailsService', () => {
        expect(emailsService.findAll).toHaveBeenCalled();
      });

      test('then it should return an array of emails', () => {
        expect(result).toEqual([emailStub()]);
      });
    });
  });

  describe('findEmail', () => {
    describe('when findEmail is called', () => {
      let result: Email;

      beforeEach(async () => {
        result = await emailsController.findEmail(emailStub()._id);
      });

      test('then it should call emailsService', () => {
        expect(emailsService.findEmail).toHaveBeenCalledWith(emailStub()._id);
      });

      test('then it should return an email', () => {
        expect(result).toEqual(emailStub());
      });
    });
  });

  describe('findBySender', () => {
    describe('when findBySender is called', () => {
      let result: Email[];

      beforeEach(async () => {
        result = await emailsController.findBySender(emailStub().sender);
      });

      test('then it should call emailsService', () => {
        expect(emailsService.findBySender).toHaveBeenCalledWith(
          emailStub().sender,
        );
      });

      test('then it should return an array of emails', () => {
        expect(result).toEqual([emailStub()]);
      });
    });
  });

  describe('findByRecipient', () => {
    describe('when findByRecipient is called', () => {
      let result: Email[];

      beforeEach(async () => {
        result = await emailsController.findByRecipient(emailStub().recipient);
      });

      test('then it should call emailsService', () => {
        expect(emailsService.findByRecipient).toHaveBeenCalledWith(
          emailStub().recipient,
        );
      });

      test('then it should return an array of emails', () => {
        expect(result).toEqual([emailStub()]);
      });
    });
  });

  describe('createEmail', () => {
    describe('when createEmail is called', () => {
      let result: EmailDocument;
      let createEmailDto: CreateEmailDto;

      beforeEach(async () => {
        createEmailDto = {
          sender: emailStub().sender,
          recipient: emailStub().recipient,
          subject: emailStub().subject,
          body: emailStub().body,
        };

        result = await emailsController.createEmail(createEmailDto);
      });

      test('then it should call emailsService', () => {
        expect(emailsService.create).toHaveBeenCalledWith(createEmailDto);
      });

      test('then it should return an email', () => {
        expect(result).toEqual(emailStub());
      });
    });
  });

  describe('updateEmail', () => {
    describe('when updateEmail is called', () => {
      let result: EmailDocument;
      let updateEmailDto: UpdateEmailDto;

      beforeEach(async () => {
        updateEmailDto = {
          sender: emailStub().sender,
          recipient: emailStub().recipient,
          subject: emailStub().subject,
          body: emailStub().body,
          read: emailStub().read,
          deleted: emailStub().deleted,
        };

        result = await emailsController.updateEmail(
          emailStub()._id,
          updateEmailDto,
        );
      });

      test('then it should call emailsService', () => {
        expect(emailsService.update).toHaveBeenCalledWith(
          emailStub()._id,
          updateEmailDto,
        );
      });

      test('then it should return an email', () => {
        expect(result).toEqual(emailStub());
      });
    });
  });
});
