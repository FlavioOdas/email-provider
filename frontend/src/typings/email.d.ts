export interface Email {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  date: Date;
  read: boolean;
  deleted: boolean;
}
