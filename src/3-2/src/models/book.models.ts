import Autor from "./autor.models.js";

export default class Book {
  constructor(
    public booksName: string,
    public autors: string[] = [],
    public booksId?: number,
    public booksImg?: string,
    public booksDescription?: string,
    public booksYear?: number,
    public booksPages?: number,
    public booksPgsClick: number = 0,
    public booksBtnClick: number = 0,
  ) { }
}

