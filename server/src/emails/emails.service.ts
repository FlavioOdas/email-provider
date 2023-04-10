import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailDocument } from './emails.schema';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel('Email') private readonly emailModel: Model<EmailDocument>,
  ) {}

  // Create a new email
  async create(email: CreateEmailDto): Promise<EmailDocument> {
    try {
      const newEmail = new this.emailModel(email);
      return await newEmail.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Find all emails
  async findAll(): Promise<EmailDocument[]> {
    try {
      return await this.emailModel.find();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Find a single email
  async findEmail(id: string): Promise<EmailDocument> {
    try {
      return await this.emailModel.findById(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Find all emails from a specific recipient
  async findByRecipient(recipient: string): Promise<EmailDocument[]> {
    try {
      return await this.emailModel.find({ recipient });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Find all emails from a specific sender
  async findBySender(sender: string): Promise<EmailDocument[]> {
    try {
      return await this.emailModel.find({ sender });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Find all emails that have moved to trash
  async findTrash(recipient: string): Promise<EmailDocument[]> {
    try {
      return await this.emailModel.find({ recipient, deleted: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update email
  async update(id: string, emailData: UpdateEmailDto): Promise<EmailDocument> {
    try {
      return await this.emailModel.findByIdAndUpdate(id, emailData, {
        new: true,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
