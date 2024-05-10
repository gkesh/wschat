import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [UsersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
