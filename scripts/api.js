'use strict';

var lounge_api = {
    // url: 'http://localhost:3000',
    url: 'https://mighty-earth-7735.herokuapp.com/',

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

    index: function index(callback) {
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

    // showProject: function showProject(project_id, callback) {
    //     this.ajax({
    //         method: 'GET',
    //         url: this.url + '/projects' + project_id,
    //         dataType: 'json',
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         dataType: 'json'
    //     }, callback);
    // },


    search: function search(keyParam, searchParam, callback) {
        this.ajax({
          method: 'GET',
          url: this.url + '/projects?' + keyParam + '=' + searchParam,
          dataType: 'json',
          xhrFields: {
                withCredentials: true
            },
          dataType: 'json'
        }, callback);
    },

    create: function create(project, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/projects',
            contentType: false,
            processData: false,
            data: project,
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json'
        }, callback);
    },

    update: function update(project_id, project, callback) {
        this.ajax({
            method: 'PATCH',
            url: this.url + '/projects/' + project_id,
            contentType: false,
            processData: false,
            data: project,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            dataType: 'json'

        }, callback);
    },

    destroy: function destroy(project_id, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/projects/' + project_id,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }

        }, callback);
    }

};
