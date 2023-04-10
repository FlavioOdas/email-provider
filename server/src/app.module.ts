import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailsModule } from './emails/emails.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EmailsModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/Email'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
