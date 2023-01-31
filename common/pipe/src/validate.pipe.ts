import { Injectable, PipeTransform, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidationError } from 'class-validator';

@Injectable()
export class ValidatePipe extends ValidationPipe implements PipeTransform {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  override flattenValidationErrors(valid: ValidationError[]): string[] {
    return valid
      .map(error => this.mapChildrenToValidationErrors(error))
      .flat()
      .filter(item => !!item.constraints)
      .map(item => {
        return JSON.stringify({
          property: item.property,
          err: Object.values(item.constraints),
        });
      })
      .flat();
  }
  //Override func from `ValidationPipe`
  override createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      const errors = this.flattenValidationErrors(validationErrors).map(item => JSON.parse(item));
      return new HttpErrorByCode[this.errorHttpStatusCode](errors, {
        invalidArgs: validationErrors,
      });
    };
  }
}
