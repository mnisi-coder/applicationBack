import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
// import { ItemsService } from './items/items.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys'

import { Model } from 'mongoose';




@Module({
  imports: [ItemsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 