import { attributeFields } from "graphql-sequelize";
import { GraphQLList, GraphQLString, GraphQLInt } from "graphql";
import { User } from "../schemas/User";
import ResponsePayload from "../schemas/ResponsePayload";
import userJoiModel from "../../joiModels/userModel";
import updateUserJoiModel from "../../joiModels/putUserModel";
import { joiValidate } from "../validator";
import _ from "lodash/fp";
import joi from "joi";
const uuid = require("node-uuid"),
  emailService = include("services/emailService"),
  config = include("config")(),
  base = _.assign(
    {},
    attributeFields(sequelize.models.user, {
      exclude: ["id", "createdAt", "updatedAt"]
    })
  ),
  baseUpdate = _.assign(
    {},
    attributeFields(sequelize.models.user, {
      exclude: ["createdAt", "updatedAt"]
    })
  ),
  CreateUser = {
    type: ResponsePayload,
    args: base,
    resolve: (root, user, context) => {
      return joiValidate({
        permission: "WriteUser",
        obj: user,
        joiModel: userJoiModel,
        user: context.user
      }).then(() => {
        return new Promise(function(resolve, reject) {
          return sequelize.models.user.create(user)
            .then(user => resolve({ success: true, payload: user }))
            .catch(e => {
              console.log(e);
              reject(e);
            });
        });
      });
    }
  },
  UpdateUser = {
    type: ResponsePayload,
    args: baseUpdate,
    resolve: (root, user, context) => {
      return joiValidate({
        permission: "WriteUser",
        obj: user,
        joiModel: updateUserJoiModel,
        user: context.user
      }).then(() => {
        return new Promise(function(resolve, reject) {
          sequelize.models.user
            .update(user, { where: { id: user.id } })
            .then(() => {
              return sequelize.models.user.findOne({ where: { id: user.id } });
            })
            .then(r => resolve({ success: true, payload: r }))
            .catch(e => {
              console.log(e);
              reject(e);
            });
        });
      });
    }
  }
, DeleteUser = {
    type: ResponsePayload,
    args: baseUpdate,
    resolve: (root, user, context) => {
      return joiValidate({
        permission: "WriteUser",
        obj: user,
        joiModel: joi.object().keys({ id: joi.string().required() }),
        user: context.user
      }).then(() => {
        return sequelize.models.user
          .destroy({ where: { id: user.id } })
          .then(r => Promise.resolve({ success: true, payload: r }));
        });
      }
    }
;

export { CreateUser, UpdateUser, DeleteUser};
