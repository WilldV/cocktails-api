import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { FindAllParamsDto, FindOneParamsDto } from '../dto';

@Injectable()
export class ParamsPipe
  implements
    PipeTransform<FindAllParamsDto | FindOneParamsDto, Record<string, any>>
{
  transform({ relations, order }: FindAllParamsDto): Record<string, any> {
    const formattedParams = {};

    if (relations) {
      let formatted = [];
      if (typeof relations == 'string') {
        formatted.push(relations);
      } else if (Array.isArray(relations)) {
        formatted = relations;
      }
      formattedParams['formattedRelations'] = formatted;
    }

    if (order) {
      const formatted = {};
      if (Array.isArray(order)) {
        order.forEach((v) => {
          this.formatOrder(v, formatted);
        });
      } else {
        this.formatOrder(order, formatted);
      }
      formattedParams['formattedOrder'] = formatted;
    }

    return formattedParams;
  }

  formatOrder(value: string, formattedObject: Record<string, 'DESC' | 'ASC'>) {
    const firstCharacter = value[0];
    const field = ['+', '-'].includes(firstCharacter)
      ? value.substring(1)
      : value;

    const words = field.split('.').reverse();

    let element;

    words.forEach((word, i) => {
      if (words.length == 1) {
        if (firstCharacter == '-') {
          formattedObject[word] = 'DESC';
        } else {
          formattedObject[word] = 'ASC';
        }
      } else if (!element) {
        element = {};
        if (firstCharacter == '-') {
          element[word] = 'DESC';
        } else {
          element[word] = 'ASC';
        }
      } else if (i == words.length - 1) {
        formattedObject[word] = element;
      } else {
        element = { [word]: { ...element } };
      }
    });
  }
}
