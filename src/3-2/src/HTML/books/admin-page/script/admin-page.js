function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onloadend = function (e) {
      $('#prevImage').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$("#inputGroupFile").change(function () {
  readURL(this);
});

function delBook(id) {
  console.log('id = ' + id);

  swal({
    title: 'Вы уверены?',
    text: 'Согласие приведет к невозвратимому удалению книги',
    icon: 'warning',
    buttons: {
      cansel:
      {
        text: 'Льолик, не надо!',
        value: null
      },
      confirm: {
        text: 'Да, уверен!',
        value: id
      }
    }
  })
    .then(inputValue => {
      if (inputValue) {
        console.log('for delaled ' + inputValue);
        doAjaxQuery('GET', '/api/v1/admin/books/' + inputValue + '/remove', null, function (res) {
          swal({
            title: 'Удалено!',
            text: 'Надеюсь, вы осознаете что сейчас произошло ))',
            icon: 'success'
          }).then(
            function () {
              window.location.href = '/api/v1/admin';
            });
        });
      }
    });
}

$("#addNewBookForm").submit(function (event) {
  // cancels the form submission
  event.preventDefault();
  submitForm();
});

function submitForm() {
  let autors = [];
  let formData = new FormData();
  const booksName = $("#booksName").val();
  const booksYear = $("#booksYear").val();
  autors.push($("#autors1").val());
  let author = $("#autors2").val();
  if (author) autors.push(author);
  author = $("#autors3").val();
  if (author) autors.push(author);
  const booksDescription = $("#booksDescription").val();
  const data = { booksName, autors, booksDescription, booksYear };
  formData.append('newBook', JSON.stringify(data));
  if ($('#inputGroupFile')[0].files[0]) {
    formData.append('file', $('#inputGroupFile')[0].files[0], 'image.jpg');
  }

  $.ajax({
    url: '/api/v1/admin/books/addBook',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (res) {
      console.log(res);
      if (!res.success) {
        view.showError(res.msg);
        return;
      } else {
        return swal("Отлично!", 'Книга ' + booksName + '\nдобавлена.', 'success')
          .then(
            function () {
              window.location.href = '/api/v1/admin';
            });
      }
    },
    error: function (jqXHR, textStatus) {
      view.showError('Ошибка ' + textStatus);
    }
  });

  // doAjaxQuery('POST', '/api/v1/admin/books/addBook', formData, //data,
  //   function (res) {
  //     console.log(res);
  //     if (res.success) {
  //       return swal("Отлично!", 'Книга ' + booksName + '\nдобавлена.', 'success')
  //         .then(
  //           function () {
  //             window.location.href = '/api/v1/admin';
  //           });
  //     } else {
  //       return swal("Ошибка!", 'Книга ' + booksName + '\nне добавлена.', 'warning');
  //     }
  //   });

}
