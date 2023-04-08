export interface Email {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  date: Date;
  read: boolean;
  deleted: boolean;
}
