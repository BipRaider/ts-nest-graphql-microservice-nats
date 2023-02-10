import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarSerializer, GraphQLScalarValueParser, Kind, ValueNode } from 'graphql';

import { Schema, Types } from 'mongoose';

/*** Validation to id in response or request. */
@Scalar('ObjectID', type => Schema.Types.ObjectId)
export class ObjectIdScalar implements CustomScalar<string | string[], string | string[]> {
  description = 'Mongo object id scalar type';
  /** Value sent to the client */
  serialize: GraphQLScalarSerializer<string | string[]> = (value: unknown): string | string[] => {
    // check the type of received value
    if (Array.isArray(value)) {
      const items = value.map(v => Types.ObjectId.isValid(v));
      const exist = items.some(v => v === false);
      if (exist) {
        throw new Error('ObjectIdScalar can only serialize ObjectId values');
      }
      return value;
    }
    if (typeof value === 'string') {
      if (Types.ObjectId.isValid(value)) return value;
    }

    throw new Error('ObjectIdScalar can only serialize ObjectId values');
  };
  /*** Value from the client */
  parseValue: GraphQLScalarValueParser<string | string[]> = (value: unknown): string | string[] => {
    // check the type of received value
    if (Array.isArray(value)) {
      const items = value.map(v => Types.ObjectId.isValid(v));
      const exist = items.some(v => v === false);

      if (!exist) return value;
    }

    if (typeof value === 'string') {
      if (Types.ObjectId.isValid(value)) return value;
    }

    throw new Error('ObjectIdScalar can only serialize ObjectId values');
  };

  parseLiteral(ast: ValueNode): string {
    // check the type of received value
    if (ast.kind !== Kind.STRING || ast.kind !== Kind.STRING)
      throw new Error('ObjectIdScalar can only parse string values');

    if (Array.isArray(ast.value)) {
      const items = ast.value.map(v => Types.ObjectId.isValid(v));
      const exist = items.some(v => v === false);
      if (!exist) return ast.value;
    }

    if (typeof ast.value === 'string') {
      if (Types.ObjectId.isValid(ast.value)) return ast.value;
    }

    throw new Error('ObjectIdScalar can only serialize ObjectId values');
  }
}
