import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ParamsDto } from '../dto';

@Injectable()
export class ParamsPipe
  implements PipeTransform<ParamsDto, Record<string, any>>
{
  transform({ relations, order }: ParamsDto): Record<string, any> {
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
    if (firstCharacter == '-') {
      formattedObject[field] = 'DESC';
    } else {
      formattedObject[field] = 'ASC';
    }
  }
}
