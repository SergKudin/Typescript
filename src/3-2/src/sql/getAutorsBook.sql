select `autorsName` from `autors` where `autorsId` in (select `autorsId` from `books_authors` where `booksId` = ?);
