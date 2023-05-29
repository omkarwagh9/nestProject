import { PipeTransform, BadRequestException } from '@nestjs/common';

import { CreateUserDto } from './user.dto';

import { UserSchema } from './schema.dto';
import { ObjectSchema } from 'joi';

export class CreateUserValidatorPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {}

    transform(value: any) {
      const { error } = this.schema.validate(value);
      if (error) {
        throw new BadRequestException('Validation failed', error.message);
      }
      return value;
    }
  }
