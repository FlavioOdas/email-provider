import { MockModel } from '../../__mocks__/mock.model';
import { EmailDocument } from '../../emails.schema';
import { emailStub } from '../stubs/email.stub';

export class EmailModel extends MockModel<Partial<EmailDocument>> {
  protected entityStub = emailStub();
}
