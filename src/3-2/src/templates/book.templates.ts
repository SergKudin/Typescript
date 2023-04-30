import path from "path";
import Book from "../models/book.models.js";
import { readFile } from "../services/file.service.js";
import { __dirname, adr } from "../app.config.js";
import { sql } from "../services/query.servise.js";

const filePath1: string = 'HTML';
const filePath2: string = 'books';
const filePath3: string = 'book-page';
const filePath4: string = 'books-page';
const filePath: string = path.join(filePath1, filePath2, filePath3);

export async function getBookHtml(bookId: number) {
  const file: string = path.join(__dirname, filePath, 'book-page.html');
  const strForInsertBooks: string = '<!-- Insert content -->';
  let html: string = await readFile(file);
  const book: Book = await sql.getBookId(bookId);
  html = html.replace('https://programming.org.ua/ua', `http://${adr.ip}:${adr.PORT}`);
  html = html.replace('getAdressAdminPage', `http://${adr.ip}:${adr.PORT}/api/v1/admin`);
  return html
    .replace(strForInsertBooks, getBookTemplate(book));
}

function getBookTemplate(bookItem: Book) {
  const imgSrc = (bookItem.booksImg) ? `../static/img/${bookItem.booksImg}` : '../static/img/noIMG.jpg';
  const autors = (bookItem.autors) ? bookItem.autors.join(', ') : '';
  const BookTemplate: string = `<!-- start -->
<div id="content" class="book_block col-xs-12 col-sm-12 col-md-12 col-lg-12">
  <script id="pattern" type="text/template">
      <div data-book-id="{id}" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
          <div class="book">
              <a href="/book/{id}"><img src="img/books/{id}.jpg" alt="{title}">
                  <div data-title="{title}" class="blockI">
                      <div data-book-title="{title}" class="title size_text">{title}</div>
                      <div data-book-author="{author}" class="author">{author}</div>
                  </div>
              </a>
              <a href="/book/{id}">
                  <button type="button" class="details btn btn-success">Читать</button>
              </a>
          </div>
      </div>
  </script>
  <div id="id" book-id="${bookItem.booksId}">
      <div id="bookImg" class="col-xs-12 col-sm-3 col-md-3 item" style="margin:0;">
        <img src="${imgSrc}" alt="Responsive image" class="img-responsive">
          <hr>
      </div>
      <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 info">
          <div class="bookInfo col-md-12">
              <div id="title" class="titleBook">${bookItem.booksName}</div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="bookLastInfo">
                  <div class="bookRow"><span class="properties">автор:</span><span id="author">${autors || ''}</span></div>
                  <div class="bookRow"><span class="properties">год:</span><span id="year">${bookItem.booksYear || ''}</span></div>
                  <div class="bookRow"><span class="properties">страниц:</span><span id="pages">${bookItem.booksPages || ''}</span></div>
                  <div class="bookRow"><span class="properties">isbn:</span><span id="isbn">${bookItem.booksBtnClick || ''}</span></div>
              </div>
          </div>
          <div class="btnBlock col-xs-12 col-sm-12 col-md-12">
              <button type="button" class="btnBookID btn-lg btn btn-success">Хочу читать!</button>
          </div>
          <div class="bookDescription col-xs-12 col-sm-12 col-md-12 hidden-xs hidden-sm">
              <h4>О книге</h4>
              <hr>
              <p id="description">${bookItem.booksDescription || bookItem.booksName}</p>
          </div>
      </div>
      <div class="bookDescription col-xs-12 col-sm-12 col-md-12 hidden-md hidden-lg">
          <h4>О книге</h4>
          <hr>
          <p class="description">${bookItem.booksDescription || bookItem.booksName}</p>
      </div>
  </div>
</div>
<!-- end -->`

  return BookTemplate;
}
