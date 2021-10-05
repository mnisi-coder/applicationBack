import { Controller,Get,Post,Put,Delete,Body,Req,Res,Param} from '@nestjs/common';
// import { CreateItemsDto } from './dto/create-items.dto';
import {Request,Response} from 'express';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { CreateItemsDto } from './dto/create-items.dto';
@Controller('items')

export class ItemsController {

constructor(private readonly itemsService: ItemsService) {}

  //   @Get()
  //  Findall(): Promise<Item[]> {
  //       return this.itemsService.Findall();
  //     }

      @Get()
      findAll(@Req() req) {
          return this.itemsService.Findall(req.query);
      }   

@Get(':id')

FindOne(@Param('id') id): Promise<Item>{
    return this.itemsService.FindOne(id);
}

@Post()
 create(@Body() createItemDto: CreateItemsDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }
    
 

    @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemsDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }



}
