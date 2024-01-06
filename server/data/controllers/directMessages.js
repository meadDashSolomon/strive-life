const models = require("../models");
const prisma = models.db;

module.exports.fetchDirectMessages = async (req, res) => {
  try {
    const currentUsername = req.query.currentUsername;
    const friendUsername = req.query.friendUsername;

    const messages = await prisma.directMessage.findMany({
      where: {
        OR: [
          {
            sender_username: currentUsername,
            recipient_username: friendUsername,
          },
          {
            sender_username: friendUsername,
            recipient_username: currentUsername,
          },
        ],
      },
      orderBy: { created_at: "asc" },
    });

    console.log("MODEL SUCCESSFULLY FOUND MESSAGES", messages);
    res.send(messages);
  } catch (err) {
    console.log("CONTROLLER ERROR GETTING DMS:::::", err);
    res.sendStatus(500);
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const { sender_username, recipient_username, chat } = req.body;

    const newMessage = await prisma.directMessage.create({
      data: {
        chat,
        sender: {
          connect: { username: sender_username },
        },
        recipient: {
          connect: { username: recipient_username },
        },
      },
    });

    console.log("MODEL SUCCESSFULLY SAVED MESSAGE", newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
