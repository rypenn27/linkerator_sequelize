const { models } = require("../db");
const express = require("express");
const apiRouter = express.Router();

// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!",
//   });
// });

apiRouter.get("/links/:linkId", async (req, res, next) => {
  const { Link, Tag } = models;
  const { linkId } = req.params;

  const linkData = await Link.findOne({ id: linkId, include: Tag });

  res.send({
    link: linkData,
  });
});

apiRouter.get("/tags/:tagId", async (req, res, next) => {
  const { Link, Tag } = models;
  const { tagId } = req.params;

  const tagData = await Tag.findOne({ id: tagId, include: Link });

  res.send({
    Tag: tagData,
  });
});

apiRouter.post("/links/:linkId/tags", async (req, res, next) => {
  const { Link, Tag } = models;
  const { linkId } = req.params;
  const { tag } = req.body;

  console.log(`adding tag ${tag}`);

  const link = await Link.findOne({
    include: [{ model: Tag, as: "Tags" }],
    where: { id: Number.parseInt(linkId) },
  });

  console.log("found link");
  const tagObject = await Tag.findOrCreate({ where: { tag } });

  console.log("tag saved");
  console.log(tagObject);

  // link.Tags.push(tagObject);
  const linkData = await link.save();
  console.log("link saved");
  console.log(linkData);

  const Tags = linkData.Tags.splice();
  Tags.map((tag3, idx) => {
    delete tag3.LinkTags;

    tag3.LinkTags = undefined;
    Tags[idx] = tag3;

    console.log(tag3);
  });

  console.log("LinkTags removed");

  // console.log("stripping link.tags[x].LinkDa");
  // linkData.Tags.map((tagObject, idx) => {
  //   delete tagObject.LinkTags;
  //   linkData.Tags[idx] = tag;
  // });

  linkData.Tags = Tags;

  res.send({
    Link: linkData,
  });
});

// apiRouter.get("/tags/:tagId", async (req, res, next) => {
//   const { Link, Tag } = models;
//   const { tagId } = req.params;

//   const tagData = await Tag.findOne({ id: tagId, include: Link });

//   res.send({
//     link: tagData,
//   });
// });

// const linksRouter = require("./links");
// apiRouter.use("/links", linksRouter);

// const tagsRouter = require("./tags");
// apiRouter.use("./tags", tagsRouter);

module.exports = apiRouter;
