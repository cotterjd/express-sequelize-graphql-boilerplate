var secret = include(".secrets.json").secret,
  jwt = require("jwt-simple");
module.exports = {
  name: "user",
  model: {
    id: {
      type: Sequelize.UUID,
      unique: true,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    email: { type: Sequelize.STRING, unique: true },
    image: { type: Sequelize.TEXT("medium") },
    signature: { type: Sequelize.TEXT("medium") },
    guardianSignature: { type: Sequelize.TEXT("medium") },
    signatureImage: { type: Sequelize.TEXT("medium") },
    guardianSignatureImage: { type: Sequelize.TEXT("medium") },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    description: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      set: function(value) {
        if (value) {
          this.setDataValue("password", jwt.encode(value, secret));
        }
      }
    },
    activated: { type: Sequelize.BOOLEAN, default: false },
    validationKey: Sequelize.STRING,
    guardianEmail: Sequelize.STRING,
    guardianEmail2: Sequelize.STRING,
    guardianName: Sequelize.STRING,
    guardianName2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zipcode: Sequelize.STRING,
    keyExpired: Sequelize.BOOLEAN, //no longer used
    stripeCustomerId: Sequelize.STRING
  }
};
