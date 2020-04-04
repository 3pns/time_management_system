# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Code Conventions

# successful queries


POST/PUT/PATCH : must return the updated object


# queries with errors

Must follow the pattern below :

{
    "errors": {
        "field_name_or_error_name": [
            "error_message"
        ]
    }
}

# Deployment

## Environment variables required by the Docker image

DEVISE_JWT_SECRET_KEY
MAILER_DEVISE_SENDER
