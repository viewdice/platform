import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LRangeArgs = {
  key: string;
  start: number;
  stop: number;
};

export const _lrange: ResolverFunction<LRangeArgs> = async (
  root,
  { key, start, stop },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.lrange(key, start, stop);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **LRANGE key start stop**

    Get a range of elements from a list. [Read more >>](https://redis.io/commands/lrange)
    """
    _lrange(key: String!, start: Int!, stop: Int!): [String]
  }
`;
