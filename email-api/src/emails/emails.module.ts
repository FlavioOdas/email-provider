import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { EmailSchema } from './emails.schema';
import { EmailsGateway } from './email.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
  ],
  controllers: [EmailsController],
  providers: [EmailsService, EmailsGateway],
})
export class EmailsModule {}
