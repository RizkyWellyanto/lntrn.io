# lntrn.io

### API docs
    "/"
        GET
            returns index.html
    "/posts"
        GET
            return all posts
        POST
            push a new post to the database
            user must be logged in
            update the user's post array
    "/post:id"
        PUT
            update a lantern
        DELETE
            delete the lantern, update the user's post array
    "/user"
        GET
            get the current logged in user, must be authenticated
    "/register"
        POST
            takes email, password, password2
    "/login"
        POST
            params are username and password
    "/logout"
        GET
            logout a user
    "/auth/facebook"
        GET
            calling this endpoint will automatically redirect user to facebook one click login

### How to set up lntrn.io
    npm install
    bower install
    node server