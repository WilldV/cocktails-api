import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { CocktailsModule } from './cocktails/cocktails.module';
import { StepsModule } from './steps/steps.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { IngredientsStepsModule } from './ingredients-steps/ingredients-steps.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
    }),
    CategoriesModule,
    SubcategoriesModule,
    CocktailsModule,
    StepsModule,
    IngredientsModule,
    IngredientsStepsModule,
  ],
})
export class AppModule {}
