import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailDocument } from './emails.schema';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailsGateway } from './email.gateway';

@Controller('emails')
export class EmailsController {
  constructor(
    private readonly emailsService: EmailsService,
    private readonly emailsGateway: EmailsGateway,
  ) {}

  // Create a new email
  @Post()
  async createEmail(@Body() email: CreateEmailDto): Promise<EmailDocument> {
    const createdEmail = await this.emailsService.create(email);

    // Send email to all connected clients
    this.emailsGateway.handleNewEmail(createdEmail);

    return createdEmail;
  }

  // Find all emails
  @Get()
  async findAll(): Promise<EmailDocument[]> {
    return await this.emailsService.findAll();
  }

  // Find a single email and returns all data inside it
  @Get(':id')
  async findEmail(@Param('id') id: string): Promise<EmailDocument> {
    return await this.emailsService.findEmail(id);
  }

  // Find all emails from a specific recipient
  @Get('inbox/:recipient')
  async findByRecipient(
    @Param('recipient') recipient: string,
  ): Promise<EmailDocument[]> {
    return await this.emailsService.findByRecipient(recipient);
  }

  // Find all emails from a specific sender
  @Get('sent/:sender')
  async findBySender(
    @Param('sender') sender: string,
  ): Promise<EmailDocument[]> {
    return await this.emailsService.findBySender(sender);
  }

  // Find all emails moved to trash
  @Get('trash/:recipient')
  async findByTrash(
    @Param('recipient') recipient: string,
  ): Promise<EmailDocument[]> {
    return await this.emailsService.findTrash(recipient);
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
