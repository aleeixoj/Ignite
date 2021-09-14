import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1631632387870
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifiations_cars',
        columns: [
          { name: 'car_id', type: 'uuid' },
          { name: 'specification_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'specifiations_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      })
    );
    await queryRunner.createForeignKey(
      'specifiations_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifiations_cars',
      'FKCarSpecification'
    );
    await queryRunner.dropForeignKey(
      'specifiations_cars',
      'FKSpecificationCar'
    );
    await queryRunner.dropTable('specifiations_cars');
  }
}
