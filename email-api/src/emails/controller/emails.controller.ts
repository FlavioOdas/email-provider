import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EmailsService } from '../service/emails.service';
import { CreateEmailDto } from '../dto/create-email.dto';
import { EmailDocument } from '../emails.schema';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  // Create a new email
  @Post()
  async createEmail(@Body() email: CreateEmailDto): Promise<EmailDocument> {
    return await this.emailsService.create(email);
  }

  // Find all emails
  @Get()
  async findAll(): Promise<EmailDocument[]> {
    return await this.emailsService.findAll();
  }

  // Find a single email and returns all data inside it
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmailDocument> {
    return await this.emailsService.findOne(id);
  }

  // Find all emails from a specific recipient
  @Get(':recipient')
  async findByRecipient(
    @Param('recipient') recipient: string,
  ): Promise<EmailDocument[]> {
    return await this.emailsService.findByRecipient(recipient);
  }
}
