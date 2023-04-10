import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Email {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, default: Date.now() })
  date: Date;

  @Prop({ required: true, default: false })
  read: boolean;

  @Prop({ required: true, default: false })
  deleted: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
