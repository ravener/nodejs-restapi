const fs = require("fs");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: "postgres"
});

const files = fs.readdirSync(__dirname);

for(const file of files) {
  if(file === "db.js") continue;
  const model = require(`./${file}`);
  model.initialize(sequelize);
}

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
