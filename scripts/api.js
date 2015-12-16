'use strict';

var lounge_api = {
    url: 'http://localhost:3000',
    // url: 'http://ancient-scrubland-6716.herokuapp.com',

    ajax: function(config, cb) {
        $.ajax(config).done(function(data, textStatus, jqxhr) {
            cb(null, data);
        }).fail(function(jqxhr, status, error) {
            cb({
                jqxher: jqxhr,
                status: status,
                error: error
            });
        });
    },

    signup: function signup(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/signup',
            contentType: 'application/json',
            data: JSON.stringify(credentials)
        }, callback);
    },

    login: function login(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/login',
            xhrFields: {
                withCredentials: true
            },
            contentType: 'application/json',
            data: JSON.stringify(credentials)

        }, callback);
    },

    logout: function logout(callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/logout',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        }, callback);
    },


    ///// List and List Items

    showProjects: function showProjects(callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/projects',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json'
        }, callback);
    },

    showProject: function showProject(project_id, callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/projects' + project_id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json'
        }, callback);
    },

    createProject: function createProject(project, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/projects',
            contentType: 'application/json',
            data: JSON.stringify(project),
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json'
        }, callback);
    },

    updateProject: function updateProject(project_id, project, callback) {
        this.ajax({
            method: 'PATCH',
            contentType: 'application/json',
            url: this.url + '/projects/' + project_id,
            data: JSON.stringify(project),
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }, callback);
    },

    destroyProject: function destroyProject(project_id, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/projects/' + project_id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }

        }, callback);
    },

    searchProjects: function searchProjects(searchParam, callback) {
        this.ajax({
          method: 'GET',
          url: this.url + '/all_projects?q=' + searchParam,
          dataType: 'json'
        }, callback);
      }


};
