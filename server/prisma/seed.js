const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Helper function to hash passwords
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      name: "User One",
      username: "userone",
      password: await hashPassword("user1password"),
      age: 30,
      experience: 1,
      goals: "Lose weight",
      height: 170,
      online_status: true,
      sex: "female",
      trainer: false,
      weight: 70,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      name: "User Two",
      username: "usertwo",
      password: await hashPassword("user2password"),
      age: 25,
      experience: 2,
      goals: "Build muscle",
      height: 180,
      online_status: false,
      sex: "male",
      trainer: true,
      weight: 80,
    },
  });

  // Create posts for user1
  for (let i = 1; i <= 5; i++) {
    await prisma.post.create({
      data: {
        title: `User One Post ${i}`,
        body: `This is post ${i} by User One`,
        username: user1.username,
      },
    });
  }

  // Create posts for user2
  for (let i = 1; i <= 3; i++) {
    await prisma.post.create({
      data: {
        title: `User Two Post ${i}`,
        body: `This is post ${i} by User Two`,
        username: user2.username,
      },
    });
  }

  // Create comments on user1's first post
  const user1Posts = await prisma.post.findMany({
    where: { username: user1.username },
  });

  if (user1Posts.length > 0) {
    const firstPostId = user1Posts[0].id;

    for (let i = 1; i <= 3; i++) {
      await prisma.comment.create({
        data: {
          body: `Comment ${i} on User One's first post`,
          username: user2.username,
          post_id: firstPostId,
        },
      });
    }
  }

  // Create direct messages between user1 and user2
  await prisma.directMessage.create({
    data: {
      chat: "Hello from User One to User Two",
      sender: {
        connect: { username: user1.username },
      },
      recipient: {
        connect: { username: user2.username },
      },
    },
  });

  await prisma.directMessage.create({
    data: {
      chat: "Hello from User Two to User One",
      sender: {
        connect: { username: user2.username },
      },
      recipient: {
        connect: { username: user1.username },
      },
    },
  });

  // Additional data seeding can be added here
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
