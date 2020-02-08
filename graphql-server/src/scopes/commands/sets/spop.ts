import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SPopArg = {
  key: string;
  count?: number;
};

export const _spop: ResolverFunction<SPopArg> = async (
  root,
  { key, count },
  ctx
): Promise<string> => {
  try {
    const reply = count
      ? await redisClient.spop(key, count)
      : redisClient.spop(key);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Remove and return one or multiple random members from a set. [Read more >>](https://redis.io/commands/spop)
    """
    _spop(key: String!, count: Int): String
  }
`;
