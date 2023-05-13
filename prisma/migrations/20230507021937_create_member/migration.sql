-- CreateTable
CREATE TABLE `MembersOnLists` (
    `userId` VARCHAR(191) NOT NULL,
    `listId` VARCHAR(191) NOT NULL,

    INDEX `MembersOnLists_userId_idx`(`userId`),
    INDEX `MembersOnLists_listId_idx`(`listId`),
    PRIMARY KEY (`userId`, `listId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
