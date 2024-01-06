const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Fetch the first user
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log("No users found in the database.");
    return;
  }

  // Create an AiChat record for this user
  const aiChat = await prisma.aiChat.create({
    data: {
      user: {
        connect: {
          username: user.username,
        },
      },
    },
  });

  console.log(
    `AiChat record created for user ${user.username} with ID ${aiChat.id}`
  );

  // Create some AiChatHistory records
  const messages = [
    {
      message: "Hello, how can I assist you with your fitness goals today?",
      is_ai: true,
    },
    { message: "I'm looking for advice on weight loss.", is_ai: false },
    {
      message:
        "Sure, I recommend a balanced diet and regular exercise. Let's start with your current routine.",
      is_ai: true,
    },
    // Add more messages as needed
  ];

  for (const msg of messages) {
    await prisma.aiChatHistory.create({
      data: {
        ai_chat_id: aiChat.id,
        message: msg.message,
        is_ai: msg.is_ai,
      },
    });
  }

  console.log("AiChatHistory records created.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
