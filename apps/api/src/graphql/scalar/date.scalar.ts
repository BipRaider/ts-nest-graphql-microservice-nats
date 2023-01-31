import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarSerializer, GraphQLScalarValueParser, Kind, ValueNode } from 'graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';
  /** Value sent to the client */
  serialize: GraphQLScalarSerializer<number> = (value: unknown): number => {
    if (value instanceof Date) return value.getTime();
    return new Date().getTime();
  };

  /*** Value from the client */
  parseValue: GraphQLScalarValueParser<Date> = (value: unknown): Date => {
    if (typeof value === 'string') return new Date(value);
    if (typeof value === 'number') return new Date(value);
    if (value instanceof Date) return new Date(value);
    return new Date();
  };
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) return new Date(ast.value);

    return null;
  }
}
