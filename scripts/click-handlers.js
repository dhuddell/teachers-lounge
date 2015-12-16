$(document).ready(function() {

$('#upload').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);

    formData.append('title', $("#filename").val());

    $.ajax({
       xhrFields: {
        withCredentials: true
      },
      url: 'http://localhost:3000/project_zip_files',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData
    }).done(function(data) {
      console.log((JSON.stringify(data, null, 2)));
        // $(".files").append("<li><b> File: </b>" + "<a href=" + data.url + ">" + data.name + "</a>" + "<b> ID: </b>" + data._id + "<b> Create at: </b>" + data.createdAt +"</li>");
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#search').on('submit', function(e){
      e.preventDefault();
      var searchParam = $('#searchInput').val();
      lounge_api.searchProjects(searchParam, function(err, data){
          handleError(err, data, function() {
              alert("broke");
          });
      });
  });



  ////////////Login / Register Helper Fucntions

  var handleError = function handleError(error, data, optional_alert) {
      if (error) {
          console.error(error);
          if (optional_alert) {
              optional_alert();
          }
          throw error;
      } else {
          console.log(data);
      }
  };

  var form2object = function(form) {
      var data = {};
      $(form).find('input').each(function(index, element) {
          var type = $(this).attr('type');
          if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
              data[$(this).attr('name')] = $(this).val();
          }
      });
      return data;
  };

  var wrap = function wrap(root, formData) {
      var wrapper = {};
      wrapper[root] = formData;
      return wrapper;
  };

  /////////////////////Register and Login/Logout Click Handlers


  ////Register
  $('#reg-form').on('submit', function(e) {
      e.preventDefault();
      var credentials = form2object(this);
      console.log(credentials);
      lounge_api.signup(credentials, function(err, data) {
          handleError(err, data, function() {
              alert("Invalid credentials");
           });
          // $('.register').hide();
          $('#reg-popup').modal('hide');
          $('.modal-backdrop').remove();
          $('#landing-page-reg-button').hide();
          $('#registration-complete').show();

          // $('#login_form').css('margin', '0px auto');

      });
  });


  // Login
  $('#login-form').on('submit', function(e) {
      e.preventDefault();
      var credentials = form2object(this);
      lounge_api.login(credentials, function(err, data) {
          handleError(err, data, function() {
              alert("Invalid credentials");
          });
          $('#login-popup').modal('hide');
          $('.modal-backdrop').remove();
          $('#logout-button-text').show();
          $('.jumbotron').hide();
          $('#show-project-list').show();
          $('#add-new-project').show();
          $('#upload').show();
          $('#search').show();
      });
  });

  // Logout
  $('#logout-button-text').on('click', function(e) {
      lounge_api.logout(function(err, data) {
          handleError(err, data);
          console.log("logged out");
          $('#logout-button-text').hide();
          $('.jumbotron').show();
          $('#project-table-header').hide();
          $('#show-project-list').hide();
          $('#project-table').hide();
          $('#add-new-project').hide();
          $('#update-project').hide();
      });
      e.preventDefault();
  });

  // showProjects
  $('#show-project-list').on('click', function(e){
      e.preventDefault();
      lounge_api.showProjects(function(err, data){
          handleError(err,data);
          data.forEach(function(project){
            $('#project-table tr:last').after(
              '<tr data-id=' + project._id + '><td>' + project.title +  '</td><td>' + project.description + '</td><td>' + project.subject + '</td><td>' + project.grade + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
          });
          $('#show-project-list').hide();
          $('#project-table').show();
          $('#project-table-header').show();

      });
  });

  // CreateProject
  $('#create-project').on('submit', function(e) {
      e.preventDefault();
      var credentials = form2object(this);
      $('input:text').val('');
      $('#add-new-project-popup').hide();
      $('.modal-backdrop').remove();
      lounge_api.createProject(credentials, function(err, data){
        handleError(err,data);
        $('#project-table tr:last').after(
          '<tr data-id=' + data._id + '><td>' + data.title +  '</td><td>' + data.description + '</td><td>' + data.subject + '</td><td>' + data.grade + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
      });
  });

  // destroyProject or display edit window
  $('#project-table').on('click', function(event){
      event.preventDefault();
      var $target = $(event.target);
      id = $target.parent().parent().data('id');
      if($target.hasClass("delete")){
          console.log("deleting ", id);
          $target.parent().parent().remove();

          lounge_api.destroyProject(id, function(err, data){});
      }else if($target.hasClass("edit")){
          console.log("editing ", id);

          $('#update-title').val($target.parent().prev().prev().prev().prev().text());
          $('#update-description').val($target.parent().prev().prev().prev().text());
          $('#update-subject').val($target.parent().prev().prev().text());
          $('#update-grade').val($target.parent().prev().text());
          $('#update-project').show();
          $target.parent().parent().remove();
      }
  });

  // UpdateProject
  $('#update-project').on('submit', function(e) {
      e.preventDefault();
      var credentials = form2object(this);
      $('input:text').val('');
      console.log(credentials);
      console.log(id);
      lounge_api.updateProject(id, credentials, function(err, data){
        handleError(err,data);
        $('#project-table tr:last').after(
          '<tr data-id=' + data._id + '><td>' + data.title +  '</td><td>' + data.description + '</td><td>' + data.subject + '</td><td>' + data.grade + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
        $('#update-project').hide();

      });
  });

});
