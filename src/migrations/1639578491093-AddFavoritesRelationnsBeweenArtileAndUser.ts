import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavoritesRelationnsBeweenArtileAndUser1639578491093
  implements MigrationInterface
{
  name = 'AddFavoritesRelationnsBeweenArtileAndUser1639578491093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`FK_65d9ccc1b02f4d904e90bd76a34\` ON \`articles\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_favorites_articles\` (\`usersId\` int NOT NULL, \`articlesId\` int NOT NULL, INDEX \`IDX_b3bc5ca3e98f5f3858dbf626ad\` (\`usersId\`), INDEX \`IDX_61dc60abcf0035e5ce2aea013b\` (\`articlesId\`), PRIMARY KEY (\`usersId\`, \`articlesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`authorId\` \`authorId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` ADD CONSTRAINT \`FK_65d9ccc1b02f4d904e90bd76a34\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favorites_articles\` ADD CONSTRAINT \`FK_b3bc5ca3e98f5f3858dbf626ad6\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favorites_articles\` ADD CONSTRAINT \`FK_61dc60abcf0035e5ce2aea013bc\` FOREIGN KEY (\`articlesId\`) REFERENCES \`articles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_favorites_articles\` DROP FOREIGN KEY \`FK_61dc60abcf0035e5ce2aea013bc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_favorites_articles\` DROP FOREIGN KEY \`FK_b3bc5ca3e98f5f3858dbf626ad6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` DROP FOREIGN KEY \`FK_65d9ccc1b02f4d904e90bd76a34\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`authorId\` \`authorId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_61dc60abcf0035e5ce2aea013b\` ON \`users_favorites_articles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b3bc5ca3e98f5f3858dbf626ad\` ON \`users_favorites_articles\``,
    );
    await queryRunner.query(`DROP TABLE \`users_favorites_articles\``);
    await queryRunner.query(
      `CREATE INDEX \`FK_65d9ccc1b02f4d904e90bd76a34\` ON \`articles\` (\`authorId\`)`,
    );
  }
}
