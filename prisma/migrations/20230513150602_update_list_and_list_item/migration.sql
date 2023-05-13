/*
  Warnings:

  - You are about to drop the column `userId` on the `List` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,listId]` on the table `MembersOnLists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `List_userId_idx` ON `List`;

-- AlterTable
ALTER TABLE `List` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ListItem` ADD COLUMN `choosed` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `List_ownerId_idx` ON `List`(`ownerId`);

-- CreateIndex
CREATE UNIQUE INDEX `MembersOnLists_userId_listId_key` ON `MembersOnLists`(`userId`, `listId`);
