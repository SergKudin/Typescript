import path from "path";
import Book from "../models/book.models.js";
import { readFile } from "../services/file.service.js";
import { __dirname, adr } from "../app.config.js";
import { sql } from "../services/query.servise.js";

const filePath1: string = 'HTML';
const filePath2: string = 'books';
const filePath3: string = 'books-page';
const filePath: string = path.join(filePath1, filePath2, filePath3);

export async function getSearchCodeHtml(search: string): Promise<string> {
  const file: string = path.join(__dirname, filePath, 'books-page.html');
  const strForInsertBooks: string = '<!-- insert books -->';
  let html: string = await readFile(file);
  html = html.replace('https://programming.org.ua/ua', `http://${adr.ip}:${adr.PORT}`);
  html = html.replace('getAdressAdminPage', `http://${adr.ip}:${adr.PORT}/api/v1/admin`);
  return html
    .replace(strForInsertBooks, getSearchTemplate(await sql.searchBooks(search), search));
}

function getSearchTemplate(books: Book[], search: string): string {
  return `<h1>Вы искали: ${search}</h1>
  <h2>Найдено результатов: ${books.length}</h2>
  ${books.map(book => getBookTemplate(book)).join('\n')}`;
}

function getBookTemplate(bookItem: Book): string {
  const href = `/book/${bookItem.booksId}`;
  const autors = (bookItem.autors) ? bookItem.autors.join(', ') : '';
  return `<div data-book-id="${bookItem.booksId}" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
<div class="book">
    <a href="${href}"><img src="/static/img/${(bookItem.booksImg) ? bookItem.booksImg : 'noIMG.jpg'}" alt="${bookItem.booksName}">
        <div data-title="${bookItem.booksName}" class="blockI" style="height: 46px;">
            <div data-book-title="${bookItem.booksName}" class="title size_text">${bookItem.booksName}</div>
            <div data-book-author="${autors}" class="author">${autors}</div>
        </div>
    </a>
    <a href="${href}">
        <button type="button" class="details btn btn-success">Читать</button>
    </a>
</div>
</div>`
}

