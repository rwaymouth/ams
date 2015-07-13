$('.input--toggle').on('click', function showModal() {
  $('.modal').toggleClass('hidden');
});

$('.modal--cancel').on('click', function hideModal(e) {
  e.preventDefault();
  $('.modal').addClass('hidden');
});

function validate(el){
  var valid = el[0].validity.valid;
  if (valid) {
    el.removeClass('error');
    return getVal(el);
  } else {
    el.addClass('error');
  }
}

function getVal(el) {
  var val = el.val();
  return val;
}

function getData(form) {
  var firstName = $('#firstName', form);
  var lastName = $('#lastName', form);
  var phone = $('#tel', form);

  var data = {
    firstName: validate(firstName),
    lastName: validate(lastName),
    phone: validate(phone)
  };
  return data;
}

function submitData(data, action) {
  data.action = action;
  $.ajax({
    url: 'lib/config.php',
    type: 'post',
    data: data,
    success: function(response) {
      data.id = response;
      addPerson(data);
      listenForDelete();
    },
    error: function error(xhr, desc, err) {
      console.log(xhr);
      console.log('Details: ' + desc + '\nError: ' + err);
    }
  });
}

function deleteData(data, action) {
  data.action = action;
  $.ajax({
    url: 'lib/config.php',
    type: 'post',
    data: data,
    success: function(response) {
      removePerson(response);
    },
    error: function error(xhr, desc, err) {
      console.log(xhr);
      console.log('Details: ' + desc + '\nError: ' + err);
    }
  });
}

function addPerson(data) {
  var html = '<tr id="person-' + data.id + '" class="list--entry">';
  html += '<td class="entry--item">' + data.lastName + '</td>';
  html += '<td class="entry--item">' + data.firstName + '</td>';
  html += '<td class="entry--item">' + data.phone + '</td>';
  html += '<td class="entry--item"><button class="remove--person ">X</button></td>';
  $('.phone--list > tbody').append(html);
  $('.tablesaw').trigger('tablesaw.enhance');
}

function removePerson(id) {
  var entry = '#person-' + id;
  $(entry).remove();
}

$('.app--input').on('submit', function(e){
  e.preventDefault();
  var form = $(this);
  var data = getData(form);
  var errors = $('.error', form);
  if (errors.length ===  0) {
    $('.modal').addClass('hidden');
    submitData(data, 'new');
    clearData(form);
  }
})

function clearData(form) {
  var inputs = $('input', form);
  inputs.map(function clear(d){
    this.value = '';
  });
}

function listenForDelete() {
  $('.remove--person', '.phone--list').on('click', function() {
    var entry = $(this).parents('tr');
    var id = parseInt(entry[0].id.replace('person-', ''));
    var data = {
      id: id
    };
    deleteData(data, 'delete');
  });
}

listenForDelete();
