import path from "path";
import { readFile } from "../services/file.service.js";
import { __dirname, adr } from "../app.config.js";
import { getActPagePagination, getNumPagePagination, getSubArrPageBooks } from "../services/paginationAdm.service.js";
import Book from "../models/book.models.js";

const filePath1: string = 'HTML';
const filePath2: string = 'books';
const filePath3: string = 'admin-page';
const filePath: string = path.join(filePath1, filePath2, filePath3);

export async function getAdminHtml(): Promise<string> {
  const file: string = path.join(__dirname, filePath, 'admin-page.html');
  let html: string = await readFile(file);
  html = html.replace('https://programming.org.ua/ua', `http://${adr.ip}:${adr.PORT}`);
  let strForInsert: string = '<!-- insert tbody -->';
  html = html.replace(strForInsert, await getTableBooks());
  strForInsert = '<!-- pagination books table -->';
  html = html.replace(strForInsert, await getPagination());
  return html;
}

async function getTableBooks(): Promise<string> {
  console.log('getTableBooks');
  const books: Book[] = await getSubArrPageBooks();
  const tbody: string = books.map((book, i) => {
    return `<tr>
  <th scope="row">${i + 1}</th>
  <td>${book.booksName}</td> 
  <td>${book.autors.join(', ')}</td>
  <td>${book.booksYear || 'n/d'}</td>
  <td><button class="btn btn-outline-secondary" onclick="delBook(${book.booksId});">Удалить</button></td>
  <td>${book.booksBtnClick || '0'}</td>
  <td>${book.booksPgsClick || '0'}</td>
</tr>`
  }).join('\n');
  return tbody;
}

async function getPagination(): Promise<string> {
  const actPages: number = await getActPagePagination();
  const nPages: number = await getNumPagePagination();
  let pagin = `
<nav aria-label="admin-page pagination">
  <ul class="pagination justify-content-center">
    <li class="page-item ${(actPages === 0) ? 'disabled' : ''}">
      <a class="page-link" href="http://${adr.ip}:${adr.PORT}/api/v1/admin/pagination/prev" ${(actPages === 0) ? ' tabindex="-1" aria-disabled="true"' : ''}>Предыдущая</a>
    </li>
${getNumbersPages(actPages, nPages)}
    <li class="page-item ${((actPages + 1) === nPages) ? 'disabled' : ''}">
      <a class="page-link" href="http://${adr.ip}:${adr.PORT}/api/v1/admin/pagination/next" ${((actPages + 1) === nPages) ? ' tabindex="-1" aria-disabled="true"' : ''}>Следующая</a>
    </li>
  </ul>
</nav>
`
  return pagin;
}

function getNumbersPages(actPages: number, nPages: number): string {
  let s = ``;
  for (let page = 0; page < nPages; page++) {
    const href = (actPages === page) ? `#` : `http://${adr.ip}:${adr.PORT}/api/v1/admin/pagination/${page}`;
    const actPage = (actPages === page) ? 'active' : '';
    s = s + '\n' + `<li class="page-item ${actPage}"><a class="page-link" href="${href}">${page + 1}</a></li>`;
  }
  return s;
}