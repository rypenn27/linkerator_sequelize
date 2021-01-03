// code to build and initialize DB goes here
const {
  client,
  sequelize,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    const dropLinkTagsResult = await client.query(
      "DROP TABLE IF EXISTS link_tags CASCADE"
    );
    const dropLinksResult = await client.query(
      "DROP TABLE IF EXISTS links CASCADE"
    );
    const dropTagsResult = await client.query(
      "DROP TABLE IF EXISTS tags CASCADE"
    );

    // build tables in correct order
    const createLinksQuery = `CREATE TABLE public.links
    (
        id serial,
        url character varying(512) COLLATE pg_catalog."default",
        click_count bigint,
        comment character varying(256) COLLATE pg_catalog."default",
        creation_date date,
        CONSTRAINT links_pkey PRIMARY KEY (id)
    )`;
    const createLinksResult = await client.query(createLinksQuery);

    const createTagsQuery = `CREATE TABLE public.tags
    (
        id serial,
        tag character varying(128) COLLATE pg_catalog."default",
        CONSTRAINT tags_pkey PRIMARY KEY (id)
    )`;
    const createTagsResult = await client.query(createTagsQuery);

    const createLinkTagsQuery = `CREATE TABLE public.link_tags
    (
        id serial,
        link_id integer,
        tag_id integer,
        CONSTRAINT link_tags_pkey PRIMARY KEY (id),
        CONSTRAINT link_id FOREIGN KEY (id)
            REFERENCES public.links (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT tag_id FOREIGN KEY (id)
            REFERENCES public.tags (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
            NOT VALID
    )`;
    const createLinkTagsResult = await client.query(createLinkTagsQuery);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("testing db connection");
    try {
      await sequelize.authenticate();
      console.log("Sequelize Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
