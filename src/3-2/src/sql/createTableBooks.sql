CREATE TABLE `books` (
  `booksId` int NOT NULL AUTO_INCREMENT,
  `booksImg` varchar(50) DEFAULT 'noIMG.jpg',
  `booksName` varchar(250) NOT NULL,
  `booksDescription` varchar(1000) DEFAULT NULL,
  `booksYear` year DEFAULT NULL,
  `booksPages` smallint unsigned DEFAULT NULL,
  `booksPgsClick` int unsigned DEFAULT NULL,
  `booksBtnClick` int unsigned DEFAULT NULL,
  `softDelete` int unsigned DEFAULT 0,
  PRIMARY KEY (`booksId`)
) ENGINE=InnoDB;