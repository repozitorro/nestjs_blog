import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1639223907170 implements MigrationInterface {
  name = 'SeedDb1639223907170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('admin', 'admin@gmail.com', '$2b$10$VOIJM32/JHOrRzzFPYlxT.EscKetuBlLAFcGNZA8S4Wu0sZ6CaDAO')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article desc', 'First article body', 'coffee,dragons', 1)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
