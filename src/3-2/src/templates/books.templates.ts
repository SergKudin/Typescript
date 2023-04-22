import path from "path";
import Book from "../models/book.models.js";
import sqlFile, { readFile } from "../services/file.service.js";
import { dbCollection } from "../services/data.servise.js";
import { __dirname, adr } from "../app.config.js";
import Autor from "../models/autor.models.js";
import { getElementsBooksInPages, getMaxElementsBooksInPages, getMinElementsBooksInPages } from "../services/paginationPgs.service.js";
import { sql } from "../services/query.servise.js";

const filePath1: string = 'HTML';
const filePath2: string = 'books';
const filePath3: string = 'books-page';
const filePath: string = path.join(filePath1, filePath2, filePath3);

export async function getBooksHtml(): Promise<string> {
  const file: string = path.join(__dirname, filePath, 'books-page.html');
  const strForInsertBooks: string = '<!-- insert books -->';
  const html: string = await insertButtonHtml(readFile(file));
  return html
    .replace(strForInsertBooks, getBooksTemplate(await sql.getBooks()));
}

async function insertButtonHtml(htmlin: Promise<string>): Promise<string> {
  const strForInsertButtons: string = '<!-- insert buttons -->'
  const html = await htmlin;
  return html.replace(strForInsertButtons, await getButtonsPagination());
}

function getBooksTemplate(books: Book[]): string {
  return books.map(book => getBookTemplate(book)).join('\n');
}

function getBookTemplate(bookItem: Book): string {
  const href = `/book/${bookItem.booksId}`;
  const autors = (bookItem.autors) ? bookItem.autors.join(', ') : '';
  return `<div data-book-id="${bookItem.booksId}" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
<div class="book">
    <a href="${href}"><img src="./static/img/${(bookItem.booksImg) ? bookItem.booksImg : 'noIMG.jpg'}" alt="${bookItem.booksName}">
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

async function getButtonsPagination(): Promise<string> {
  const min: number = getMinElementsBooksInPages();
  const current: number = getElementsBooksInPages();
  const max: number = await getMaxElementsBooksInPages();
  return `<div class="btnBlock col-xs-12 col-sm-12 col-md-12">
  <button type="button" id = "removeElements" class="${(min === current) ? 'hidden' : ''} btn-lg btn-success"  onclick='location.href="http://${adr.ip}:${adr.PORT}/remove"'>Назад</button>
  <button type="button" id = "addElements" class="${(max === current) ? 'hidden' : ''} btn-lg btn-success" onclick='location.href="http://${adr.ip}:${adr.PORT}/add"'>Вперед</button>
</div>
`
}
