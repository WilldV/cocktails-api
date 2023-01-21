import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1674314803556 implements MigrationInterface {
    name = 'BaseMigration1674314803556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(256) NOT NULL, "description" text, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredientStep" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quantity" character varying(32), "ingredientId" integer NOT NULL, "stepId" integer NOT NULL, CONSTRAINT "PK_5c1e8d29b72d78b764c9b0ca4de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."step_preparationtype_enum" AS ENUM('DIRECT', 'SHAKER', 'MIXER_GLASS', 'ADD')`);
        await queryRunner.query(`CREATE TABLE "step" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "order" integer NOT NULL, "cocktailId" integer NOT NULL, "preparationType" "public"."step_preparationtype_enum", "finalStep" character varying(256), "description" text, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cocktail_alcohollevel_enum" AS ENUM('ZERO', 'LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "cocktail" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(256) NOT NULL, "subCategoryId" integer NOT NULL, "alcoholLevel" "public"."cocktail_alcohollevel_enum" NOT NULL, "description" text, "photoUrl" character varying(128), "variation" text, CONSTRAINT "PK_2640ba026b49f47c99d3a3219c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(256) NOT NULL, "categoryId" integer NOT NULL, "description" text, CONSTRAINT "PK_5ad0b82340b411f9463c8e9554d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(256) NOT NULL, "description" text, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredientStep" ADD CONSTRAINT "FK_c1f3eac9d8e13f950086243caa3" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ingredientStep" ADD CONSTRAINT "FK_6b1c4369b7484b5013e9582ec76" FOREIGN KEY ("stepId") REFERENCES "step"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_d2e557295401b202a23ef9a05c6" FOREIGN KEY ("cocktailId") REFERENCES "cocktail"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cocktail" ADD CONSTRAINT "FK_7316a51557c122ef37417568685" FOREIGN KEY ("subCategoryId") REFERENCES "subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subcategory" ADD CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory" DROP CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2"`);
        await queryRunner.query(`ALTER TABLE "cocktail" DROP CONSTRAINT "FK_7316a51557c122ef37417568685"`);
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_d2e557295401b202a23ef9a05c6"`);
        await queryRunner.query(`ALTER TABLE "ingredientStep" DROP CONSTRAINT "FK_6b1c4369b7484b5013e9582ec76"`);
        await queryRunner.query(`ALTER TABLE "ingredientStep" DROP CONSTRAINT "FK_c1f3eac9d8e13f950086243caa3"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "subcategory"`);
        await queryRunner.query(`DROP TABLE "cocktail"`);
        await queryRunner.query(`DROP TYPE "public"."cocktail_alcohollevel_enum"`);
        await queryRunner.query(`DROP TABLE "step"`);
        await queryRunner.query(`DROP TYPE "public"."step_preparationtype_enum"`);
        await queryRunner.query(`DROP TABLE "ingredientStep"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
