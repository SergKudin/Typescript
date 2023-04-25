CREATE TABLE `autors` (
  `autorsId` int NOT NULL AUTO_INCREMENT,
  `autorsName` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (`autorsId`)
) ENGINE=InnoDB;