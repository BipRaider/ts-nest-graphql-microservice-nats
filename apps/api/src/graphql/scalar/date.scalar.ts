import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarSerializer, GraphQLScalarValueParser, Kind, ValueNode } from 'graphql';

/*** Mutation a date in response or request. */
@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<string, Date> {
  public readonly description = 'Date custom scalar type';
  /** Value sent to the client */
  serialize: GraphQLScalarSerializer<string> = (value: unknown): string => {
    if (typeof value === 'string') return new Date(value).toISOString();
    if (typeof value === 'number') return new Date(value).toISOString();
    if (value instanceof Date) return new Date(value).toISOString();
    return new Date().toISOString();
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
