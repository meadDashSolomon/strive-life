const models = require("../models");
const prisma = models.db;

module.exports.getPosts = async (req, res) => {
  try {
    let posts = await prisma.post.findMany({
      orderBy: [
        {
          created_at: "desc",
        },
      ],
      take: 5,
      include: {
        photos: {
          orderBy: {
            id: "asc",
          },
        },
        user: {
          select: {
            username: true,
            profile_pic: true,
            id: true,
          },
        },
      },
    });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports.postComment = async (req, res) => {
  const { body, user_id, post_id } = req.body;

  if (!body || !user_id || !post_id) {
    res.sendStatus(400);
    return;
  }

  try {
    await prisma.comment.create({
      data: {
        body: body,
        user: {
          connect: { id: user_id },
        },
        post: {
          connect: { id: post_id },
        },
      },
    });
    res.sendStatus(201);
  } catch (err) {
    console.error("Error posting comment", err);
    res.sendStatus(500);
  }
};

module.exports.getComments = async (req, res) => {
  const postId = parseInt(req.query.id);
  const skip = parseInt(req.query.skip) || 0;
  const take = parseInt(req.query.take) || 5;

  if (!postId) {
    res.sendStatus(400);
    return;
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { post_id: postId },
      orderBy: { created_at: "desc" },
      skip: skip,
      take: take,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile_pic: true,
          },
        },
      },
    });
    res.send(comments);
  } catch (err) {
    console.error("Error fetching comments", err);
    res.sendStatus(500);
  }
};

module.exports.postPost = async (req, res) => {
  const { title, body, user_id } = req.body;
  let photos = req.body.photos;

  try {
    await prisma.post.create({
      data: {
        title: title,
        body: body,
        user: {
          connect: { id: user_id },
        },
      },
    });
    res.status(201).send();
  } catch (err) {
    console.error("Post not accepted", err);
    res.status(500).send("Error creating post");
  }
};
