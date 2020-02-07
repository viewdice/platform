import gql from "graphql-tag";
import { OKScalar, RespBulkScalar, IntStringScalarType } from "./scalars";
import {
  resolvers as stringCommandResolvers,
  typeDefs as stringTypeDefs
} from "./strings";
import {
  resolvers as keysCommandResolver,
  typeDefs as keysTypeDefs
} from "./keys";
import {
  resolvers as connectionsCommandResolver,
  typeDefs as connectionsTypeDefs
} from "./connections";

const redisTypeDefs = gql`
  scalar OK
  scalar Errors
  scalar RespBulk
  scalar IntString

  type KeyValue {
    key: String
    value: String
  }
`;

const customScalarResolver = {
  OK: OKScalar,
  RespBulk: RespBulkScalar,
  IntString: IntStringScalarType
};

export const typeDefs = [
  redisTypeDefs,
  ...stringTypeDefs,
  ...keysTypeDefs,
  ...connectionsTypeDefs
];

export const resolvers = {
  query: {
    ...stringCommandResolvers.query,
    ...keysCommandResolver.query,
    ...connectionsCommandResolver.query
  },
  mutation: {
    ...stringCommandResolvers.mutation,
    ...keysCommandResolver.mutation,
    ...connectionsCommandResolver.mutation
  },
  subscription: {},
  types: {
    ...keysCommandResolver.types
  },
  custom: { ...customScalarResolver }
};
