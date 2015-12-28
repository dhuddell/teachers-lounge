$(document).ready(function() {

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
          $('#reg-popup').modal('hide');
          $('.modal-backdrop').remove();
          $('#landing-page-reg-button').hide();
          $('#registration-complete').show();


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

  // Index
  $('#show-project-list').on('click', function(e){
      e.preventDefault();
      lounge_api.index(function(err, data){
          handleError(err,data);
          var myProjectsTemplate = Handlebars.compile($('#project-show-all').html());
          var myCurrentProjects = myProjectsTemplate({ projects: data});
          $('.myProjects').html(myCurrentProjects);

          $('#show-project-list').hide();
          $('#project-table').show();
          $('#project-table-header').show();

      });
  });

  // Search
  $('#search').on('submit', function(e){
      e.preventDefault();
      var searchParam = $('#searchParam').val();
      var keyParam = $('#keyParam').val();

      lounge_api.search(keyParam, searchParam, function(err, data){
          handleError(err, data, function() {
              alert("broke");
          });
          var projectTemplate = Handlebars.compile($('#project-results').html());
          var searchResults = projectTemplate({ projects: data});
          $('.results').html(searchResults);
      });
  });

  // Create
  $('#create-project').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      $('input:text').val('');
      $('#add-new-project-popup').hide();
      $('.modal-backdrop').remove();
      lounge_api.create(formData, function(err, data){
        handleError(err,data);
          var myProjectsTemplate = Handlebars.compile($('#project-show').html());
          var myCurrentProjects = myProjectsTemplate(data);
          $('.myProjects').html(myCurrentProjects);
      });
  });

  // Destroy or display edit window
  $('.myProjects').on('click', function(event){
      event.preventDefault();
      var $target = $(event.target);
      id = $target.parent().parent().data('id');
      if($target.hasClass("delete")){
          console.log("deleting ", id);
          $target.parent().parent().remove();

          lounge_api.destroy(id, function(err, data){});
      }else if($target.hasClass("edit")){
          console.log("editing ", id);

          $('#update-title').val($target.parent().prev().prev().prev().prev().prev().text());
          $('#update-description').val($target.parent().prev().prev().prev().prev().text());
          $("#update-subject option[value='" + $target.parent().prev().prev().prev().val() + "']").attr("selected", true);
          $("#update-grade option[value='" + $target.parent().prev().prev().val() + "']").attr("selected", true);
          $('#update-project').show();
          $target.parent().parent().remove();
      }
  });

  // Update
  $('#update-project').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      $('input:text').val('');
      $('#update-project').hide();
      console.log(id);
      lounge_api.update(id, formData, function(err, data){
        handleError(err,data);
        $('#project-table tr:last').after(
          '<tr data-id=' + data._id + '><td>' + data.title +  '</td><td>' + data.description + '</td><td>' + data.subject + '</td><td>' + data.grade + '</td><td>' + data.url + '</td><td><button class="edit btn btn-primary">Edit</button></td><td><button class="delete btn btn-danger">Delete</button></td></tr>');
        $('#update-project').hide();
      });
  });

});
