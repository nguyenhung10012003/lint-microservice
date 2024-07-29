-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NULL,
    `country` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `alias` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

DELIMITER //

CREATE FUNCTION levenshtein(s1 VARCHAR(255), s2 VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE s1_len, s2_len, i, j, c, c_temp, cost INT;
    DECLARE s1_char CHAR;
    DECLARE cv0, cv1 VARBINARY(256);
    
    SET s1_len = CHAR_LENGTH(s1);
    SET s2_len = CHAR_LENGTH(s2);
    
    IF s1_len = 0 THEN
        RETURN s2_len;
    END IF;
    IF s2_len = 0 THEN
        RETURN s1_len;
    END IF;
    
    SET cv1 = 0x00;
    SET j = 1;
    WHILE j <= s2_len DO
        SET cv1 = CONCAT(cv1, UNHEX(HEX(j)));
        SET j = j + 1;
    END WHILE;
    
    SET i = 1;
    WHILE i <= s1_len DO
        SET s1_char = SUBSTRING(s1, i, 1);
        SET c = i - 1;
        SET cv0 = UNHEX(HEX(i));
        SET j = 1;
        WHILE j <= s2_len DO
            SET c = c + 1;
            IF s1_char = SUBSTRING(s2, j, 1) THEN
                SET cost = 0; 
            ELSE
                SET cost = 1;
            END IF;
            SET c_temp = CONV(HEX(SUBSTRING(cv1, j, 1)), 16, 10) + cost;
            IF c > c_temp THEN
                SET c = c_temp;
            END IF;
            SET c_temp = CONV(HEX(SUBSTRING(cv1, j + 1, 1)), 16, 10) + 1;
            IF c > c_temp THEN
                SET c = c_temp;
            END IF;
            SET cv0 = CONCAT(cv0, UNHEX(HEX(c)));
            SET j = j + 1;
        END WHILE;
        SET cv1 = cv0;
        SET i = i + 1;
    END WHILE;
    
    RETURN c;
END //

DELIMITER ;

