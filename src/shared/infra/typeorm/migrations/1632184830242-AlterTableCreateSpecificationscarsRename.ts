import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCreateSpecificationscarsRename1632184830242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('specifiations_cars', 'specifications_cars');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('specifications_cars', 'specifiations_cars');
  }
}
