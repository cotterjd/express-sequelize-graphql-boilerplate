
module.exports = function config() {
  var con = {
    database: {
      name: "db_dev",
      host: "0.0.0.0",
      username: "root",
      password: "password",
      dialect: "mysql",
      logging: () => "false" //console.log
    },
    url: "http://localhost:4051",
    clientUrl: "http://localhost:8001"
  };
  return con;
};
