-- CreateTable
CREATE TABLE `ListInvitations` (
    `userId` VARCHAR(191) NOT NULL,
    `listId` VARCHAR(191) NOT NULL,

    INDEX `ListInvitations_userId_idx`(`userId`),
    INDEX `ListInvitations_listId_idx`(`listId`),
    UNIQUE INDEX `ListInvitations_userId_listId_key`(`userId`, `listId`),
    PRIMARY KEY (`userId`, `listId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
