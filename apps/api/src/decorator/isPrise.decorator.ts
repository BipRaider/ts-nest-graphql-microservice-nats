import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsPrise(property: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsPrise',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (typeof value === 'number') {
            const { constraints } = args;
            const step = constraints[0];

            return Number(value.toFixed(step)) === value;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return `The price is incorrect.`;
        },
      },
    });
  };
}
