import { PipeTransform, Injectable } from '@nestjs/common';
import { FindAllParamsDto, FindOneParamsDto } from '../dto';

@Injectable()
export class ParamsPipe
  implements
    PipeTransform<FindAllParamsDto | FindOneParamsDto, Record<string, any>>
{
  transform({ relations, order }: FindAllParamsDto): Record<string, any> {
    const formattedParams = {};

    if (relations) {
      formattedParams['formattedRelations'] = this.formatRelations(relations);
    }

    if (order) {
      formattedParams['formattedOrder'] = this.formatOrder(order);
    }

    return formattedParams;
  }

  formatRelations(relations: string | string[]) {
    let formatted = [];

    if (typeof relations == 'string') {
      formatted.push(relations);
    } else if (Array.isArray(relations)) {
      formatted = relations;
    }

    return formatted;
  }

  formatOrder(order: string | string[]) {
    let formatted = {};
    if (Array.isArray(order)) {
      order.forEach((v) => {
        const newOrder = this.formatSingleOrder(v);
        formatted = { ...formatted, ...newOrder };
      });
    } else {
      formatted = this.formatSingleOrder(order);
    }

    return formatted;
  }

  formatSingleOrder(value: string) {
    const firstCharacter = value[0];
    const field = ['+', '-'].includes(firstCharacter)
      ? value.substring(1)
      : value;

    const words = field.split('.').reverse();

    const orderTypeMap = {
      '+': 'ASC',
      '-': 'DESC',
    };

    const newFormmatedOrder = {};

    if (words.length == 1) {
      return {
        [words[0]]: orderTypeMap[firstCharacter] ?? orderTypeMap['+'],
      };
    }

    let element = {
      [words[0]]: orderTypeMap[firstCharacter] ?? orderTypeMap['+'],
    };

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      if (i == words.length - 1) {
        newFormmatedOrder[word] = element;
      } else {
        element = { [word]: { ...element } };
      }
    }

    return newFormmatedOrder;
  }
}
