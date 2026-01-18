import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from './db/mongoose.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
