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
      email: "alex.smith@example.com",
      name: "Alex Smith",
      username: "alexsmith",
      password: await hashPassword("alex-pw"),
      profile_pic: "/assets/alex.png",
      age: 30,
      experience: 1,
      goals: "Lose weight",
      height: 170,
      online_status: true,
      sex: "male",
      trainer: false,
      weight: 70,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "john.jacobs@example.com",
      name: "John Jacobs",
      username: "johnjacobs",
      password: await hashPassword("john-pw"),
      profile_pic: "/assets/john.png",
      age: 30,
      experience: 1,
      goals: "Lose weight",
      height: 170,
      online_status: true,
      sex: "male",
      trainer: false,
      weight: 70,
    },
  });

  // Posts
  const post1 = await prisma.post.create({
    data: {
      title: "My Fitness Journey",
      body: "Started my fitness journey today! Excited about the progress.",
      username: user1.username,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "I lost 5 pounds!",
      body: "In the last month, I lost 5 pounds.",
      username: user2.username,
    },
  });

  // Comments
  const comment1 = await prisma.comment.create({
    data: {
      body: "Great start! Keep it up!",
      username: user2.username,
      post_id: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      body: "Way to go!",
      username: user1.username,
      post_id: post2.id,
    },
  });

  // Create direct messages between user1 and user2
  await prisma.directMessage.create({
    data: {
      chat: "Hi John! How are you?",
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
      chat: "Great! You?",
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
