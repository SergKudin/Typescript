-- DROP DATABASE IF EXISTS `shpptestbooksdb`;
-- CREATE DATABASE `shpptestbooksdb`;
-- USE `shpptestbooksdb`;
DROP TABLE IF EXISTS `books`;

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

INSERT INTO `books`(`booksId`, `booksImg`,  `booksName`) VALUE 
(23, '23.jpg', 'Программирование на языке Go!'),
(25, '25.jpg', 'Толковый словарь сетевых терминов и аббревиатур'),
(26, '26.jpg', 'Python for Data Analysis'),
(27, '27.jpg', 'Thinking in Java (4th Edition)'),
(29, '29.jpg', 'Introduction to Algorithms'),
(31, '31.jpg', 'JavaScript Pocket Reference'),
(32, '32.jpg', 'Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles'),
(33, '33.jpg', 'SQL: The Complete Referenc'),
(34, '34.jpg', 'PHP and MySQL Web Development'),
(35, '35.jpg', 'Статистический анализ и визуализация данных с помощью R'),
(36, '36.jpg', 'Computer Coding for Kid'),
(37, '37.jpg', 'Exploring Arduino: Tools and Techniques for Engineering Wizardry'),
(38, '38.jpg', 'Программирование микроконтроллеров для начинающих и не только'),
(39, '39.jpg', 'The Internet of Things'),
(40, '40.jpg', 'Sketching User Experiences: The Workbook'),
(41, '41.jpg', 'InDesign CS6'),
(42, '42.jpg', 'Адаптивный дизайн. Делаем сайты для любых устройств'),
(43, '43.jpg', 'Android для разработчиков'),
(44, '44.jpg', 'Clean Code: A Handbook of Agile Software Craftsmanship'),
(45, '45.jpg', 'Swift Pocket Reference: Programming for iOS and OS X'),
(46, '46.jpg', 'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence'),
(47, '47.jpg', 'Head First Ruby'),
(48, '48.jpg', 'Practical Vim');

INSERT INTO `books`(`booksId`, `booksImg`,  `booksName`, `booksDescription`,  `booksYear`, `booksPages`, `booksPgsClick`, `booksBtnClick`) VALUE 
(22, '22.jpg', 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 'Лекции и практикум по программированию на Си++', 2003, 351, 10, 2);

-- select * from `books`;

DROP TABLE IF EXISTS `autors`;

CREATE TABLE `autors` (
  `autorsId` int NOT NULL AUTO_INCREMENT,
  `autorsName` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (`autorsId`)
) ENGINE=InnoDB;

INSERT INTO `autors`(`autorsId`, `autorsName`) VALUE 
(1, 'Андрей Богуславский'),
(2, 'Марк Саммерфильд'),
(3, 'М. Вильямс'),
(4, 'Уэс Маккинни'),
(5, 'Брюс Эккель'),
(6, 'Томас Кормен'), (25, 'Чарльз Лейзерсон'), (26, 'Рональд Ривест'), (27, 'Клиффорд Штайн'),
(7, 'Дэвид Флэнаган'),
(8, 'Гэри Маклин Холл'),
(9, 'Джеймс Р. Грофф'),
(10, 'Люк Веллинг'),
(11, 'Сергей Мастицкий'),
(12, 'Джон Вудкок'),
(13, 'Джереми Блум'),
(14, 'А. Белов'),
(15, 'Сэмюэл Грингард'),
(16, 'Сет Гринберг'),
(17, 'Александр Сераков'),
(18, 'Тим Кедлек'),
(19, 'Пол Дейтел'), (28, 'Харви Дейтел'),
(20, 'Роберт Мартин'),
(21, 'Энтони Грей'),
(22, 'Мартин Фаулер'), (29, 'Прамодкумар Дж. Садаладж'),
(23, 'Джей Макгаврен'),
(24, 'Дрю Нейл');

-- select * from `autors`;


DROP TABLE IF EXISTS `books_authors`;

CREATE TABLE `books_authors` (
  `autorsId` int NOT NULL,
  `booksId` int NOT NULL,
  PRIMARY KEY (`autorsId`, `booksId`)
) ENGINE=InnoDB;

INSERT INTO `books_authors`(`autorsId`, `booksId`) VALUE 
(1, 22),
(2, 23),
(3, 25),
(4, 26),
(5, 27),
(6, 29), (25, 29), (26, 29), (27, 29),
(7, 31),
(8, 32),
(9, 33),
(10, 34),
(11, 35),
(12, 36),
(13, 37),
(14, 38),
(15, 39),
(16, 40),
(17, 41),
(18, 42),
(19, 43), (28, 43),
(20, 44),
(21, 45),
(22, 46), (29, 46),
(23, 47),
(24, 48);



