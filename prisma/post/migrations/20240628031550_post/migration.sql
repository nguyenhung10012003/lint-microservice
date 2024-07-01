-- AlterTable
ALTER TABLE `Post` ADD COLUMN `scope` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC',
    ADD COLUMN `share` INTEGER NOT NULL DEFAULT 0,
    MODIFY `content` VARCHAR(191) NULL,
    MODIFY `views` INTEGER NOT NULL DEFAULT 0;
