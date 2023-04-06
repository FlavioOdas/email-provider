import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsController } from './controller/emails.controller';
import { EmailsService } from './service/emails.service';
import { EmailSchema, Email } from './emails.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Email', schema: EmailSchema }]),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
