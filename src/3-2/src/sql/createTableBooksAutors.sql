CREATE TABLE `books_authors` (
  `autorsId` int NOT NULL,
  `booksId` int NOT NULL,
  PRIMARY KEY (`autorsId`, `booksId`)
) ENGINE=InnoDB;