import { Email } from './email';

type SendEmailRequest = Omit<Email, 'id' | 'date' | 'read' | 'deleted'>;

type UpdateEmailRequest = Partial<Email>;

type EmailApiResponse = Email;
