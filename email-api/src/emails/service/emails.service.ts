import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailDocument } from '../emails.schema';
import { CreateEmailDto } from '../dto/create-email.dto';

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
    return await this.emailModel.find().exec();
  }

  // Find a single email
  async findOne(id: string): Promise<EmailDocument> {
    return await this.emailModel.findById(id).exec();
  }

  // Find all emails from a specific recipient
  async findByRecipient(recipient: string): Promise<EmailDocument[]> {
    return await this.emailModel.find({ recipient }).exec();
  }
}
