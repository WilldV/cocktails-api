import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Category } from '../categories';
import { Cocktail } from '../cocktails';
import { Ingredient } from '../ingredients';
import { IngredientStep } from '../ingredients-steps';
import { Step } from '../steps';
import { SubCategory } from '../subcategories';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Cocktail, Ingredient, IngredientStep, Step, SubCategory],
  migrations: ['src/db/migrations/*.ts'],
});

export default dataSource;
