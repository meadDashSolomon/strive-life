/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `DirectMessage` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `DirectMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipient_username` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_username` to the `DirectMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_sender_id_fkey";

-- AlterTable
ALTER TABLE "DirectMessage" DROP COLUMN "recipient_id",
DROP COLUMN "sender_id",
ADD COLUMN     "recipient_username" TEXT NOT NULL,
ADD COLUMN     "sender_username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_recipient_username_fkey" FOREIGN KEY ("recipient_username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessage" ADD CONSTRAINT "DirectMessage_sender_username_fkey" FOREIGN KEY ("sender_username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
