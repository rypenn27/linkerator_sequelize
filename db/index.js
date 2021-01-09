// Connect to DB
const { Client } = require("pg");
const { Sequelize, DataTypes } = require("sequelize");

const DB_NAME = "linkerator";
const DB_URL =
  process.env.DATABASE_URL ||
  `postgres://postgres:noles0306@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const sequelize = new Sequelize(DB_URL); // Example for postgres

const Link = sequelize.define(
  "Link",
  {
    // Model attributes are defined here
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clickCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    // Other model options go here
  }
);

const Tag = sequelize.define(
  "Tag",
  {
    // Model attributes are defined here
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    defaultScope: {
      exclude: ["LinkTags"],
    },
  }
);

const LinkTags = sequelize.define("LinkTags", {
  LinkId: {
    type: DataTypes.INTEGER,
    references: {
      model: Link,
      key: "id",
    },
  },
  TagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: "id",
    },
  },
});

Link.belongsToMany(Tag, { through: LinkTags });
Tag.belongsToMany(Link, { through: LinkTags });

const models = {
  Link,
  Tag,
  LinkTags,
};

// database methods

// export
module.exports = {
  client,
  sequelize,
  models,
  // db methods
};
