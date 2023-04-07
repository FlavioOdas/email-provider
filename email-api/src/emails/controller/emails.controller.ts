import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { EmailsService } from '../service/emails.service';
import { CreateEmailDto } from '../dto/create-email.dto';
import { EmailDocument } from '../emails.schema';
import { UpdateEmailDto } from '../dto/update-email.dto';

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
  @Get('recipient/:recipient')
  async findByRecipient(
    @Param('recipient') recipient: string,
  ): Promise<EmailDocument[]> {
    return await this.emailsService.findByRecipient(recipient);
  }

  // Find all emails from a specific sender
  @Get('sender/:sender')
  async findBySender(
    @Param('sender') sender: string,
  ): Promise<EmailDocument[]> {
    return await this.emailsService.findBySender(sender);
  }

  // Update email
  @Put(':id')
  async updateEmail(
    @Param('id') id: string,
    @Body() email: UpdateEmailDto,
  ): Promise<EmailDocument> {
    return await this.emailsService.update(id, email);
  }
}
