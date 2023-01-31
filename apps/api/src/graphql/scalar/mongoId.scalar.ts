import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarSerializer, GraphQLScalarValueParser, Kind, ValueNode } from 'graphql';
// import { ObjectId } from 'mongodb';
import { Schema, Types } from 'mongoose';

@Scalar('ObjectID', type => Schema.Types.ObjectId)
export class ObjectIdScalar implements CustomScalar<string, string> {
  description = 'Mongo object id scalar type';

  serialize: GraphQLScalarSerializer<string> = (value: unknown): string => {
    // check the type of received value
    if (typeof value !== 'string') throw new Error('ObjectIdScalar can only serialize ObjectId values');
    if (!Types.ObjectId.isValid(value)) throw new Error('ObjectIdScalar can only serialize ObjectId values');

    return value; // value sent to the client
  };

  parseValue: GraphQLScalarValueParser<string> = (value: unknown): string => {
    // check the type of received value
    if (typeof value !== 'string') throw new Error('ObjectIdScalar can only parse string values');
    if (!Types.ObjectId.isValid(value)) throw new Error('ObjectIdScalar can only parse string values');

    return value; // value from the client input variables
  };

  parseLiteral(ast: ValueNode): string {
    // check the type of received value
    if (ast.kind !== Kind.STRING) throw new Error('ObjectIdScalar can only parse string values');
    if (!Types.ObjectId.isValid(ast.value)) throw new Error('ObjectIdScalar can only parse string values');

    return ast.value; // value from the client query
  }
}
