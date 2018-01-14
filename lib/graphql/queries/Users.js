import { GraphQLList, GraphQLString, GraphQLInt } from "graphql";
import { User } from "../schemas/User";
import { resolver, defaultListArgs } from "graphql-sequelize";
var Db = sequelize;
var _ = require("lodash");

const UserQuery = {
  type: new GraphQLList(User),
  args: _.assign(defaultListArgs(), { id: { type: GraphQLString } }),
  resolve: resolver(Db.models.user)
};

export { UserQuery };
