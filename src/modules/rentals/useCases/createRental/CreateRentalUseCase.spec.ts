import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24h = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('should be able to create a new rental', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'testeCar',
      brand: 'testeBrand',
      description: 'teste',
      category_id: 'teste',
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'IDZ2J56',
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: newCar.id,
      expected_return_date: dayAdd24h,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental with invalid time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24h,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '313131',
        expected_return_date: dayAdd24h,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: 'test',
      expected_return_date: dayAdd24h,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '54321',
        car_id: 'test',
        expected_return_date: dayAdd24h,
      })
    ).rejects.toEqual(new AppError('Car is not available!'));
  });
});
