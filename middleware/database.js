var Sequelize = require("sequelize"),
  _ = require("lodash");

module.exports = function setupDb(next) {
  var config = require("../config")();
  var db = config.database;
  global.Sequelize = Sequelize;
  global.sequelize = new Sequelize(db.name, db.username, db.password, db);

  var normalizedPath = require("path").join(__dirname, "../lib/models");
  require("fs")
    .readdirSync(normalizedPath)
    .forEach(function(file) {
      var m = require("../lib/models/" + file);
      sequelize.define(m.name, m.model);
    });
  require("../lib/associations");
  function setDefaultData() {
    return Promise.all([
      sequelize.models.role.bulkCreate(require("../lib/roles"), {
        updateOnDuplicate: ["name"]
      }),
      sequelize.models.permission.bulkCreate(require("../lib/permissions"), {
        updateOnDuplicate: ["name", "description"]
      })
    ]);
  }
  sequelize
    .sync({ force: process.env.NODE_ENV == "test" })
    .then(function() {
      console.log("db synced");
      // sequelize.models.user.bulkCreate(require("../lib/testUsers"));
      setDefaultData().then(() => {
        next();
      });
    })
    .catch(function(e) {
      console.error(e);
      next();
    });
};
