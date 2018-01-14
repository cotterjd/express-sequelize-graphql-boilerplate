import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from "graphql";
import { typeMapper } from "graphql-sequelize";
import GraphQLDate from "graphql-date";

typeMapper.mapType(type => {
  //map bools as strings
  if (type instanceof Sequelize.DATE) {
    return GraphQLDate;
  }
  //use default for everything else
  return false;
});
import { File } from "./schemas/File";
import { UserQuery } from "./queries/Users";
import { Login } from "./mutations/Login";


var Db = sequelize;

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is a root query.",
  fields: () => ({
    users: UserQuery,
  })
});
const Mutation = new GraphQLObjectType({
  name: "Mutations",
  description: "This is a root mutation.",
  fields: () => ({
    createUser: CreateUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser,
    login: Login
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
export { Schema };
