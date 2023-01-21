import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1674316909821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO category (name, id) VALUES ('Largo', 1),('Corto', 2);`,
    );
    await queryRunner.query(
      `INSERT INTO subcategory (name,"categoryId", id) VALUES ('Ron',1, 1),('Pisco',2, 2);`,
    );
    await queryRunner.query(
      `INSERT INTO ingredient (name, id) VALUES ('Jugo de lima', 1), ('Hojas de menta o hierbabuena', 2), ('Ron blanco', 3), ('Azúcar', 4), ('Agua con gas', 5), ('Gaseosa de limón', 6), ('Hielo picado', 7), ('Jarabe de azúcar / Symple syrup', 8), ('Clara de huevo', 9), ('Pisco quebranta', 10);`,
    );
    await queryRunner.query(
      `INSERT INTO cocktail (name,"subCategoryId","alcoholLevel",variation, id) VALUES ('Mojito',1,'MEDIUM','Cambiar el azúcar y el agua con gas por gaseosa de limón', 1), ('Pisco sour',2,'HIGH','Cambiar la canela en polvo por unas gotas de angostura', 2);`,
    );
    await queryRunner.query(
      `INSERT INTO step ("order","cocktailId","preparationType","finalStep",description, id) VALUES (1,1,'ADD','Machacar sin romper las hojas de menta',NULL, 1), (2,1,'ADD','Remover por unos segundos',NULL, 2), (3,1,'ADD',NULL,NULL, 3), (1,1,'ADD','Machacar sin romper las hojas de menta',NULL, 4), (2,1,'ADD','Remover por unos segundos',NULL, 5), (3,1,'ADD','Remover ligeramente y decorar con menta y lima',NULL, 6), (1,2,'SHAKER','Servir y espolvorear una pizca de canela en polvo','Agregar todos los ingredientes y agitar. Agregar hielo y volver a agitar', 7); `,
    );
    await queryRunner.query(
      `INSERT INTO "ingredientStep" ("quantity","ingredientId","stepId") VALUES ('1 cucharadita',4,1), ('8',2,1), ('Media lima',1,2), ('1.5 oz o 45 ml',3,2), ('Hasta completar',5,3), ('1 cucharadita',4,4), ('8',2,4), ('Media lima',1,5), ('1.5 oz o 45 ml',3,5), ('Llenar el vaso',7,6), ('Hasta completar',5,6), ('1 oz o 30ml',9,7), ('1 oz o 30ml',8,7), ('1 oz o 30ml',1,7), ('1.5 a 3 oz',10,7);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "ingredientStep" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "ingredient" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "step" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "cocktail" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "subcategory" CASCADE;`);
    await queryRunner.query(`TRUNCATE TABLE "category" CASCADE;`);
  }
}
