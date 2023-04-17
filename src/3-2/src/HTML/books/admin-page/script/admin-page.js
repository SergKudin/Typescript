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
        doAjaxQuery('GET', '/admin/api/v1/books/' + inputValue + '/remove', null, function (res) {
          swal({
            title: 'Удалено!',
            text: 'Надеюсь, вы осознаете что сейчас произошло ))',
            icon: 'success'
          },
            function () {
              window.location.href = '/admin';
            });
        });
      }
    });
}
