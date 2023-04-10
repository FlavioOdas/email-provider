import { Test } from '@nestjs/testing';
import { Email, EmailDocument } from '../emails.schema';
import { getModelToken } from '@nestjs/mongoose';

import { EmailsService } from '../emails.service';
import { EmailModel } from './support/email.model';
import { emailStub } from './stubs/email.stub';
import { CreateEmailDto } from '../dto/create-email.dto';
import { UpdateEmailDto } from '../dto/update-email.dto';

describe('EmailsService', () => {
  let emailsService: EmailsService;

  describe('Find operations', () => {
    let emailModel: EmailModel;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          EmailsService,
          {
            provide: getModelToken('Email'),
            useClass: EmailModel,
          },
        ],
      }).compile();

      emailsService = moduleRef.get<EmailsService>(EmailsService);
      emailModel = moduleRef.get<EmailModel>(getModelToken('Email'));

      jest.clearAllMocks();
    });

    describe('findEmail', () => {
      describe('when findEmail is called', () => {
        let result: Email;

        beforeEach(async () => {
          jest.spyOn(emailModel, 'findById');
          result = await emailsService.findEmail(emailStub()._id);
        });

        test('then it should call emailModel', () => {
          expect(emailModel.findById).toHaveBeenCalledWith(emailStub()._id);
        });

        test('then it should return an email', () => {
          expect(result).toEqual(emailStub());
        });
      });
    });

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let result: Email[];

        beforeEach(async () => {
          jest.spyOn(emailModel, 'find');
          result = await emailsService.findAll();
        });

        test('then it should call emailModel', () => {
          expect(emailModel.find).toHaveBeenCalled();
        });

        test('then it should return an array of emails', () => {
          expect(result).toEqual([emailStub()]);
        });
      });
    });

    describe('findBySender', () => {
      describe('when findBySender is called', () => {
        let result: Email[];

        beforeEach(async () => {
          jest.spyOn(emailModel, 'find');
          result = await emailsService.findBySender(emailStub().sender);
        });

        test('then it should call emailModel', () => {
          expect(emailModel.find).toHaveBeenCalledWith({
            sender: emailStub().sender,
          });
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
          jest.spyOn(emailModel, 'find');
          result = await emailsService.findByRecipient(emailStub().recipient);
        });

        test('then it should call emailModel', () => {
          expect(emailModel.find).toHaveBeenCalledWith({
            recipient: emailStub().recipient,
          });
        });

        test('then it should return an array of emails', () => {
          expect(result).toEqual([emailStub()]);
        });
      });
    });
  });

  describe('Create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          EmailsService,
          {
            provide: getModelToken('Email'),
            useValue: EmailModel,
          },
        ],
      }).compile();

      emailsService = moduleRef.get<EmailsService>(EmailsService);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let email: EmailDocument;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        let createEmailDto: CreateEmailDto;

        beforeEach(async () => {
          createEmailDto = {
            sender: emailStub().sender,
            recipient: emailStub().recipient,
            subject: emailStub().subject,
            body: emailStub().body,
          };

          saveSpy = jest.spyOn(EmailModel.prototype, 'save');
          constructorSpy = jest.spyOn(EmailModel.prototype, 'constructorSpy');
          email = await emailsService.create(createEmailDto);
        });

        test('then it should call the emailModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(createEmailDto);
        });

        test('then it should return an email', () => {
          expect(email).toEqual(emailStub());
        });
      });
    });
  });

  describe('Update operations', () => {
    let emailModel: EmailModel;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          EmailsService,
          {
            provide: getModelToken('Email'),
            useClass: EmailModel,
          },
        ],
      }).compile();

      emailsService = moduleRef.get<EmailsService>(EmailsService);
      emailModel = moduleRef.get<EmailModel>(getModelToken('Email'));
    });

    describe('update', () => {
      describe('when update is called', () => {
        let result: Email;
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

          jest.spyOn(emailModel, 'findByIdAndUpdate');
          result = await emailsService.update(emailStub()._id, updateEmailDto);
        });

        test('then it should call emailModel', () => {
          expect(emailModel.findByIdAndUpdate).toHaveBeenCalledWith(
            emailStub()._id,
            updateEmailDto,
            { new: true },
          );
        });

        test('then it should return an email', () => {
          expect(result).toEqual(emailStub());
        });
      });
    });
  });
});
