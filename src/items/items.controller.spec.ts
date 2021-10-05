import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';


jest.mock('./items.service');

describe('ItemsController', () => {
  let controller: ItemsController;
  let service : ItemsService;

  const mockUserService ={};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ItemsController],
      providers: [ItemsService],
      
    })
    // .overrideProvider(ItemsController)
    // .useValue(mockUserService)
    .compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);

  });
 
  it ('should be defined', () => {
    expect(controller).toBeDefined();
    })

  })

  
