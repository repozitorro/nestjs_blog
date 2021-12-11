import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameToUsers1639229368887 implements MigrationInterface {
  name = 'AddUsernameToUsers1639229368887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`username\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
  }
}
