
# The Teachers' Lounge

The Teachers' Lounge is a passion project that I dreamt up during my teaching career. The concept behind this project is to join the community, you must help grow the community. This project is a K-5 open resource center to share best practices in project-based learning.


The Teachers' Lounge allows users to Create, Read, Update, and Delete projects. Amazon Web Services is implemented to allow the upload and download of the assets attached to each project.


## Link to backend repo and hosted backend app
- https://github.com/dhuddell/teachers-lounge-back-end
- https://mighty-earth-7735.herokuapp.com

## Link to deployed app
- http://dhuddell.github.io/teachers-lounge/

## Technologies Used

- Javascript
- Node.js
- Express.js
- jQuery
- HTML/CSS
- Bootstrap
- Handlebars
- Amazon Web Services
- Passport
- Mongo DB
- Mongoose



## User Stories:

## Stories

**As a visitor to the app:**
* I can create an account.

**As a registered app user:**
* I can log in.
* I can submit a project to become a submitted user.
* I can edit and destroy existing projects.
* I can see view my projects.
* I can log out.

**As a submitted user:**
* I can search through and download every project on the site.


**Navigation Flow**

1. Register user creation
2. Login authentication
3. Create a project (Upload assets to AWS)
4. Read a project (Download assets from AWS)
5. Index all owned projects
6. Edit a project (Replace assets on AWS)
7. Destroy a project (Destroy assets on AWS)
8. Search through submitted projects
