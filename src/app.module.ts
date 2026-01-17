import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from './db/mongoose.module';

@Module({
  imports: [MongooseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
