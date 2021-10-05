import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { CreateItemsDto } from './dto/create-items.dto';


const items = {
  _id: '60e71dfbb526c52066227b64',
  name: 'Samsung 40L Mirror Microwave - MS405MADXBB',
  des: 'Product Type Solo/Installation Type Freestanding',
  imageURL: 'https://www.hirschs.co.za/media/catalog/product/cache/9c364865bfa4e33d9a4215a5e5b5540b/2/7/27777_03d6c81212093ac960685d786893f9ef.jpg',
  qty : 2699.99,
  createdAt: { type: Date, default: Date.now },
 
};

describe('ItemsService', () => {
  let service: ItemsService;
  class itemsModel 
  {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
    static  find = jest.fn().mockResolvedValue([items]);
    static  findOne= jest.fn().mockResolvedValue(items);
    static  findByIdAndUpdate= jest.fn().mockResolvedValue(items);
    static findByIdAndRemove= jest.fn().mockResolvedValue(true);
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken('Item'),
          useValue: itemsModel,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });
  test ('should be defined', () => {
    expect(service).toBeDefined();
    })

  test ('should return all the Items', () => {
    expect(service.Findall()).resolves.toEqual([items]);
   
  });
  // test ('should create a new Item and save it', () => {
  //   expect(service.create({
  //     name: items.name,
  //     des: items.des,
  //     qty: items.qty,
  //     imageURL: items.imageURL,
  //    // createdAt: { type: Date, default: Date.now } 
  //   } as CreateItemsDto )).resolves.toEqual(items);
  // });
  test('should return one Item', () => {
    expect(service.FindOne(items._id)).resolves.toEqual(items);
  });
  test('should find and update one Item', () => {
    expect(service.update(items._id, {} as any)).resolves.toEqual(items);
  });
  test('should delete one Item', () => {
    expect(service.delete(items._id)).resolves.toBeTruthy();
});
});

