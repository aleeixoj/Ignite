import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const createCar = await carsRepositoryInMemory.create({
      brand: 'Car_Brand',
      daily_rate: 550,
      description: 'Description Car',
      fine_amount: 200,
      license_plate: 'IDJ-2Z35',
      name: 'Car_name',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([createCar]);
  });

  it('should be able to list all available cars by brand', async () => {
    const createCar = await carsRepositoryInMemory.create({
      brand: 'Car_Brand2',
      daily_rate: 550,
      description: 'Description Car',
      fine_amount: 200,
      license_plate: 'IDJ-2Z34',
      name: 'Car_name2',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_Brand2',
    });
    expect(cars).toEqual([createCar]);
  });

  it('should be able to list all available cars by name', async () => {
    const createCar = await carsRepositoryInMemory.create({
      brand: 'Car_Brand2',
      daily_rate: 550,
      description: 'Description Car',
      fine_amount: 200,
      license_plate: 'IDJ-2Z34',
      name: 'Car_name3',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car_name3',
    });
    expect(cars).toEqual([createCar]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const createCar = await carsRepositoryInMemory.create({
      brand: 'Car_Brand2',
      daily_rate: 550,
      description: 'Description Car',
      fine_amount: 200,
      license_plate: 'IDJ-2Z34',
      name: 'Car_name3',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });
    expect(cars).toEqual([createCar]);
  });
});
