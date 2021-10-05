import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { QueryOptions } from 'src/config/query-options.config';


@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel:Model<Item>) {}

//   async   Findall():Promise <Item[]>{
// return await this.itemModel.find()
//   }

  async Findall(options: QueryOptions) {
    if (options.fields) {
        const results = await this.itemModel
            .find({ [options.fields]: { $regex: `.*${options.text}.*` } }, (err, doc) => {
                return doc;
            })
            .skip(Number(options.offset))
            .limit(Number(options.limit))
            .exec();
        return { results, total: results.length };
    } else {
        const results = await this.itemModel
            .find()
            .skip(Number(options.offset))
            .limit(Number(options.limit))
            .exec();
        return { results, total: results.length };
    }
}


  async FindOne(id: string): Promise<Item>  {
    return await this.itemModel.findOne({ _id: id });

  }

  async create(item: Item):Promise <Item>{
    const newItem = new this.itemModel(item)
return await newItem.save()
  }
  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }
  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
