/*
  Warnings:

  - You are about to drop the column `user_id` on the `AiChat` table. All the data in the column will be lost.
  - Added the required column `username` to the `AiChat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AiChat" DROP CONSTRAINT "AiChat_user_id_fkey";

-- AlterTable
ALTER TABLE "AiChat" DROP COLUMN "user_id",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AiChat" ADD CONSTRAINT "AiChat_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
