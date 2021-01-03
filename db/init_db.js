// code to build and initialize DB goes here
const {
  client,
  sequelize,
  models,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    console.log("Dropping and Creating Tables (Model Sync)");
    await sequelize.sync({ force: true });
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  const { Link, Tag } = models;

  try {
    console.log("Testing Sequelize connection");
    try {
      await sequelize.authenticate();
      console.log("Sequelize Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    const link1 = await Link.create({
      url: "https://google.com",
      comment: "best search engine",
    });

    const tag1 = await Tag.create({ tag: "search" });
    const tag2 = await Tag.create({ tag: "home" });

    await link1.addTag(tag1);
    await link1.addTag(tag2);

    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
