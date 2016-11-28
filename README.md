# lntrn.io

### API docs
    "/"
        GET
            returns index.html
    "/posts"
        GET
            returns random posts with num_post amount
            if num_post is not specified just return 1 random post
        POST
            push a new post to the database
            user must be logged in
            update the user's post array
    "/post:id"
        PUT
            update a lantern
        DELETE
            delete the lantern, update the user's post array
    "/user/:id"
        GET
            get a specific user, must be authenticated
    "/login"
        POST
            params are username and password
    "/logout"
        GET
            logout a user