const _ = require("lodash");
const R = require("ramda");

import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLNonNull
} from "graphql";
import { attributeFields } from "graphql-sequelize";
import { setTimeout } from "core-js/library/web/timers";

const User = new GraphQLObjectType({
  name: "User",
  description: "This represents a User",
  fields: () => _.assign(attributeFields(sequelize.models.user), {})
});

export { User };
