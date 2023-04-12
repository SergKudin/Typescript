
DROP DATABASE IF EXISTS `shpptestbooksdb`;

CREATE DATABASE `shpptestbooksdb`;

USE `shpptestbooksdb`;

/*Table structure for table `books` */

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `booksId` int NOT NULL AUTO_INCREMENT,
  `booksImg` varchar(50) DEFAULT NULL,
  `booksName` varchar(250) NOT NULL,
  `booksDescription` varchar(1000) DEFAULT NULL,
  `booksYear` year DEFAULT NULL,
  `booksPages` smallint unsigned DEFAULT NULL,
  `booksPgsClick` int unsigned DEFAULT NULL,
  `booksBtnClick` int unsigned DEFAULT NULL,
  PRIMARY KEY (`booksId`)
) ENGINE=InnoDB;

INSERT INTO `books`(`booksId`, `booksImg`,  `booksName`) VALUE 
-- (22, '/books-page_files/22.jpg', 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА'),
(23, '/books-page_files/23.jpg', 'Программирование на языке Go!'),
(25, '/books-page_files/25.jpg', 'Толковый словарь сетевых терминов и аббревиатур'),
(26, '/books-page_files/26.jpg', 'Python for Data Analysis'),
(27, '/books-page_files/27.jpg', 'Thinking in Java (4th Edition)'),
(29, '/books-page_files/29.jpg', 'Introduction to Algorithms'),
(31, '/books-page_files/31.jpg', 'JavaScript Pocket Reference'),
(32, '/books-page_files/32.jpg', 'Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles'),
(33, '/books-page_files/33.jpg', 'SQL: The Complete Referenc'),
(34, '/books-page_files/34.jpg', 'PHP and MySQL Web Development'),
(35, '/books-page_files/35.jpg', 'Статистический анализ и визуализация данных с помощью R'),
(36, '/books-page_files/36.jpg', 'Computer Coding for Kid'),
(37, '/books-page_files/37.jpg', 'Exploring Arduino: Tools and Techniques for Engineering Wizardry'),
(38, '/books-page_files/38.jpg', 'Программирование микроконтроллеров для начинающих и не только'),
(39, '/books-page_files/39.jpg', 'The Internet of Things'),
(40, '/books-page_files/40.jpg', 'Sketching User Experiences: The Workbook'),
(41, '/books-page_files/41.jpg', 'InDesign CS6'),
(42, '/books-page_files/42.jpg', 'Адаптивный дизайн. Делаем сайты для любых устройств'),
(43, '/books-page_files/43.jpg', 'Android для разработчиков'),
(44, '/books-page_files/44.jpg', 'Clean Code: A Handbook of Agile Software Craftsmanship'),
(45, '/books-page_files/45.jpg', 'Swift Pocket Reference: Programming for iOS and OS X'),
(46, '/books-page_files/46.jpg', 'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence'),
(47, '/books-page_files/47.jpg', 'Head First Ruby'),
(48, '/books-page_files/48.jpg', 'Practical Vim');

INSERT INTO `books`(`booksId`, `booksImg`,  `booksName`, `booksDescription`,  `booksYear`, `booksPages`, `booksPgsClick`, `booksBtnClick`) VALUE 
(22, '/books-page_files/22.jpg', 'СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА', 'Лекции и практикум по программированию на Си++', 2003, 351, 10, 2);

--select * from `books`;

DROP TABLE IF EXISTS `autors`;

CREATE TABLE `autors` (
  `autorsId` int NOT NULL AUTO_INCREMENT,
  `autorsName` varchar(100) NOT NULL,
  `booksId` int NOT NULL,
  PRIMARY KEY (`autorsId`),
  FOREIGN KEY (`booksId`)  REFERENCES `books` (`booksId`)
) ENGINE=InnoDB;

INSERT INTO `autors`(`autorsId`, `autorsName`,  `booksId`) VALUE 
(1, 'Андрей Богуславский', 22),
(2, 'Марк Саммерфильд', 23),
(3, 'М. Вильямс', 25),
(4, 'Уэс Маккинни', 26),
(5, 'Брюс Эккель', 27),
(6, 'Томас Кормен', 29), (25, 'Чарльз Лейзерсон', 29), (26, 'Рональд Ривест', 29), (27, 'Клиффорд Штайн', 29),
(7, 'Дэвид Флэнаган', 31),
(8, 'Гэри Маклин Холл', 32),
(9, 'Джеймс Р. Грофф', 33),
(10, 'Люк Веллинг', 34),
(11, 'Сергей Мастицкий', 35),
(12, 'Джон Вудкок', 36),
(13, 'Джереми Блум', 37),
(14, 'А. Белов', 38),
(15, 'Сэмюэл Грингард', 39),
(16, 'Сет Гринберг', 40),
(17, 'Александр Сераков', 41),
(18, 'Тим Кедлек', 42),
(19, 'Пол Дейтел', 43), (28, 'Харви Дейтел', 43),
(20, 'Роберт Мартин', 44),
(21, 'Энтони Грей', 45),
(22, 'Мартин Фаулер', 46), (29, 'Прамодкумар Дж. Садаладж', 46),
(23, 'Джей Макгаврен', 47),
(24, 'Дрю Нейл', 48);

-- select * from `autors`;




