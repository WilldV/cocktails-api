import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  IsNull,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<T> {
  constructor(protected repository: Repository<T>) {}

  rawQuery(query: string) {
    return this.repository.query(query);
  }

  findAll(body?: FindManyOptions<T>) {
    return this.repository.find(body);
  }

  findById(id: number) {
    return this.repository.findOne({
      where: {
        id,
      } as unknown as FindOptionsWhere<T>,
    });
  }

  async updateById(id: string | number, body: QueryDeepPartialEntity<T>) {
    const result = await this.repository
      .createQueryBuilder()
      .update(body)
      .where({
        id,
        deletedAt: IsNull(),
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  saveMany(rows: DeepPartial<T>[]) {
    return this.repository.save(rows);
  }

  async deleteById(id: string | number) {
    const result = await this.repository
      .createQueryBuilder()
      .update({ deletedAt: new Date() } as unknown as QueryDeepPartialEntity<T>)
      .where({
        id,
        deletedAt: IsNull(),
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  create(body: DeepPartial<T>) {
    return this.repository.save(body);
  }

  createMany(bodies: DeepPartial<T>[]) {
    return this.repository.save(bodies);
  }

  findOne(body?: FindOneOptions<T>) {
    return this.repository.findOne(body);
  }

  update(body: FindOptionsWhere<T>, payload: QueryDeepPartialEntity<T>) {
    return this.repository.update(body, payload);
  }

  delete(body?: FindOptionsWhere<T>) {
    return this.repository.softDelete(body);
  }

  count(body?: FindManyOptions<T>) {
    return this.repository.count(body);
  }

  findAndCount(body?: FindManyOptions<T>) {
    return this.repository.findAndCount(body);
  }
}
